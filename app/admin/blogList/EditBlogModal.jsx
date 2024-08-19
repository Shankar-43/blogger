"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditBlogModal = ({ blog, onClose, fetchBlogs }) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);
  const [category, setCategory] = useState(blog.category);
  const [author, setAuthor] = useState(blog.author);
  const [image, setImage] = useState(null);
  const [authorImg, setAuthorImg] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", author);

      if (image) {
        formData.append("image", image);
      }

      if (authorImg) {
        formData.append("authorImg", authorImg);
      }

      const response = await axios.put(`/api/blog?id=${blog._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
        fetchBlogs();
      } else {
        toast.error(response.data.message);
      }

      onClose();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
      fetchBlogs();
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAuthorImgChange = (e) => {
    setAuthorImg(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Blog Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Author Image</label>
          <input
            type="file"
            onChange={handleAuthorImgChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal;
