import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"; // Import axios

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: 'credentials',
            async authorize(credentials) {
                const { email, password } = credentials;
                console.log(`Credentials`, email, password);
                console.log(`Credentials`, credentials);

                try {
                    // Use Axios to make the POST request
                    const response = await axios.post('http://localhost:3000/api/userLogin', { email, password }, {
                        headers: { "Content-Type": "application/json" }
                    });

                    const user = response.data;
                    console.log(user, "user");

                    // If the response is successful and user data is available, return it
                    if (response.status === 200 && user) {
                        return user;
                    }
                } catch (error) {
                    console.error('Error logging in:', error);
                }

                // Return null if user data could not be retrieved
                return null;
            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Redirect to home page after successful sign-in
            console.log("base url : " + baseUrl);
            console.log("url : " + url);
            if (url === '/api/auth/signin') {
                return baseUrl;
            }
            // Redirect to login page if there's an error
            if (url === '/api/auth/error') {
                return `${baseUrl}/login`;
            }
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
