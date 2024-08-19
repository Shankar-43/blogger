import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Header = () => {
  const [email, setEmail] = useState(""); // State to hold email input
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!email) {
      toast.error("Please enter an email address"); // Notify if email is empty
      return;
    }

    try {
      const formData = new FormData(); // Create FormData object
      formData.append("email", email);

      const response = await axios.post("/api/email", formData); // Post the form data to the API
      console.log(response, "email response");
      if (response.data.statusCode === 201 || response.status == 200) {
        toast.success(response.data.message); // Show success message
        // alert(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Error subscribing email:", error);
      toast.error("Something went wrong. Please try again later."); // Notify in case of error
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          alt="logo"
          width={180}
          className="w-[130px] sm:w-auto"
        />
        <button
          onClick={() => router.push("/login")}
          className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
        >
          Get Started <Image src={assets.arrow} alt="arrow-button" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-sx sm:text-base">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
          nihil nulla nemo fugiat, quae enim, blanditiis nostrum velit suscipit,
          distinctio inventore explicabo quis laboriosam quam molestiae.
          Architecto corrupti ex dicta!
        </p>
        <form
          onSubmit={handleSubmit} // Handle form submission
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email} // Bind input to state
            onChange={(e) => setEmail(e.target.value)} // Update state on input change
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
