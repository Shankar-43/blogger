"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditBlogModal from "./EditBlogModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.data); // Adjust based on the structure of the response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
    setBlogToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/blog/${blogToDelete._id}`);
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogToDelete._id)
      );
      handleCloseModals();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Author Image</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                className="border-b cursor-pointer"
                onClick={() => handleEditClick(blog)}
              >
                <td className="py-2 px-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4">{blog.title}</td>
                <td className="py-2 px-4">{blog.description}</td>
                <td className="py-2 px-4">{blog.category}</td>
                <td className="py-2 px-4">{blog.author}</td>
                <td className="py-2 px-4">
                  <img
                    src={blog.authorImg}
                    alt={blog.author}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 px-4">
                  {new Date(blog.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 flex items-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(blog);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline ml-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(blog);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing */}
      {isEditModalOpen && (
        <EditBlogModal blog={selectedBlog} onClose={handleCloseModals} />
      )}

      {/* Modal for delete confirmation */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          blog={blogToDelete}
          onClose={handleCloseModals}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default BlogList;
