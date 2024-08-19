"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import EditBlogModal from "./EditBlogModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
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
      const response = await axios.delete(`/api/blog?id=${blogToDelete._id}`);
      fetchBlogs();
      handleCloseModals();
      console.log(response, "deleted blog response");
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
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
      <div className="overflow-x-auto max-h-[calc(100vh-8rem)] overflow-y-auto">
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
                className="border-b"
                // onClick={() => handleEditClick(blog)}
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
                  {new Date(blog.date).toDateString()}
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
        <EditBlogModal
          blog={selectedBlog}
          onClose={handleCloseModals}
          fetchBlogs={fetchBlogs}
        />
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
