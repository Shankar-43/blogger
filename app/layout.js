import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/Provider/NextAuthSessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blogger",
  description: "See the latest blogs on Blogger.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <NextAuthSessionProvider>
            <ToastContainer
              position="bottom-right" // Position the toast in the center
              autoClose={5000} // Auto-close after 5000 milliseconds
              hideProgressBar={false} // Show the progress bar
              closeOnClick={true} // Close the toast on click
              pauseOnHover={true} // Pause auto-close on hover
              draggable={true} // Allow drag to close
              theme="colored" // Apply colored theme
            />
            {children}
          </NextAuthSessionProvider>
        </div>
      </body>
    </html>
  );
}
