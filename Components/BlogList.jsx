import { blog_data } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        if (response.data.status === "success") {
          setBlogs(response.data.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          className={
            menu === "All" ? "bg-black text-white py-1 px-4  rounded-sm" : ""
          }
          onClick={() => setMenu("All")}
        >
          All
        </button>
        <button
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4  rounded-sm"
              : ""
          }
          onClick={() => setMenu("Technology")}
        >
          Technology
        </button>
        <button
          className={
            menu === "Startup"
              ? "bg-black text-white py-1 px-4  rounded-sm"
              : ""
          }
          onClick={() => setMenu("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4  rounded-sm"
              : ""
          }
          onClick={() => setMenu("Lifestyle")}
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item) => {
            return (
              <BlogItem
                key={item._id}
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
