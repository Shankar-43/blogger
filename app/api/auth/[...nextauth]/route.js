import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // Import axios
import GoogleProvider from "next-auth/providers/google";
import userAuthenticationModel from "@/lib/models/UserAuthenticationModel";
import ConnectDB from "@/lib/Config/db";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(`Credentials`, email, password);
        console.log(`Credentials`, credentials);

        try {
          // Use Axios to make the POST request
          const response = await axios.post(
            "/api/userLogin",
            { email, password },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = response.data;
          console.log(user, "user");

          // If the response is successful and user data is available, return it
          if (response.status === 200 && user) {
            return user;
          }
        } catch (error) {
          console.error("Error logging in:", error);
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to home page after successful sign-in
      console.log("base url : " + baseUrl);
      console.log("url : " + url);
      if (url === "/api/auth/signin") {
        return baseUrl;
      }
      // Redirect to login page if there's an error
      if (url === "/api/auth/error") {
        return `${baseUrl}/login`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async signIn({ user, account }) {
      console.log(account);
      if (account.provider === "google") {
        try {
          await ConnectDB();
          // Check if user exists
          let existingUser = await userAuthenticationModel.findOne({
            email: user.email,
          });

          if (existingUser) {
            // If user exists, update the Google details in the auth.google object
            existingUser.auth.google = {
              id: user.id,
              email: user.email,
              image: user.image,
            };

            // Save the updated user record
            await existingUser.save();
          } else {
            // If user doesn't exist, create a new user with Google details
            await userAuthenticationModel.create({
              email: user.email,
              auth: {
                google: {
                  id: user.id,
                  email: user.email,
                  image: user.image,
                },
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error handling Google sign-in:", error);
          return false;
        }
      }
      return true; // Proceed with sign-in
    },
    async session({ session, user }) {
      session.user.id = user.id; // Add user id to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
