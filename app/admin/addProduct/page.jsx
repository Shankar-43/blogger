"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
const initialData = {
  title: "",
  description: "", // Corrected typo from "descripton"
  category: "Startup",
  author: "",
};
const AddProduct = () => {
  const [image, setImage] = useState(null); // Initialize with null instead of empty string
  const [authorImage, setAuthorImage] = useState(null); // Initialize with null instead of empty string

  const [data, setData] = useState(initialData);

  const onChangeHandler = (event) => {
    const name = event.target.name; // Use 'event' instead of 'e'
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Use 'event' instead of 'e'

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description); // Corrected typo
      formData.append("category", data.category);
      formData.append("author", data.author);

      if (image) {
        formData.append("image", image);
      }
      if (authorImage) {
        formData.append("authorImg", authorImage);
      }

      const response = await axios.post("/api/blog", formData);
      if (
        response.data.status === "success" ||
        response.data.statusCode === 201
      ) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
        setImage("");
        setData(initialData);
        setAuthorImage("");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the form.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl">Upload thumbnail</p>
            <label htmlFor="image">
              <Image
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                className="mt-4"
                width={140}
                height={70}
                alt="Blog thumbnail"
              />
            </label>
            <input
              type="file"
              id="image"
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <p className="text-xl">Author Image</p>
            <label htmlFor="authorImage">
              <Image
                src={
                  !authorImage
                    ? assets.upload_area
                    : URL.createObjectURL(authorImage)
                }
                className="mt-4"
                width={140}
                height={70}
                alt="Author"
              />
            </label>
            <input
              type="file"
              id="authorImage"
              hidden
              required
              onChange={(e) => setAuthorImage(e.target.files[0])}
            />
          </div>
        </div>
        <div>
          <p className="text-xl mt-4">Blog Title</p>
          <input
            onChange={onChangeHandler}
            type="text"
            placeholder="Type here"
            required
            name="title"
            value={data.title}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          />
        </div>
        <div>
          <p className="text-xl mt-4">Author</p>
          <input
            onChange={onChangeHandler}
            type="text"
            placeholder="Type here"
            required
            name="author"
            value={data.author} // Corrected from "data.title" to "data.author"
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          />
        </div>
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          onChange={onChangeHandler}
          placeholder="write content here"
          required
          name="description"
          value={data.description}
          rows={6}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default AddProduct;
