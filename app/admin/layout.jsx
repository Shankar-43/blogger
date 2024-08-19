import { assets } from "@/assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        {/* <ToastContainer
          position="top-center" // Position the toast in the center
          autoClose={5000} // Auto-close after 5000 milliseconds
          hideProgressBar={false} // Show the progress bar
          closeOnClick={true} // Close the toast on click
          pauseOnHover={true} // Pause auto-close on hover
          draggable={true} // Allow drag to close
          theme="colored" // Apply colored theme
        /> */}
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium">Admin Panel</h3>
            <Image src={assets.profile_icon} width={40} alt="" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
