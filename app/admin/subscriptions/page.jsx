"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Subscriptions = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    // Fetch all emails when the component mounts
    const fetchEmails = async () => {
      try {
        const response = await axios.get("/api/email");
        if (response.data.status === "success") {
          setEmails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
        toast.error("Failed to load emails");
      }
    };

    fetchEmails();
  }, []);

  const handleDelete = async (emailId) => {
    try {
      const response = await axios.delete(`/api/email?email_Id=${emailId}`);
      if (response.data.status === "success") {
        setEmails(emails.filter((email) => email._id !== emailId));
        toast.success("Email deleted successfully");
      } else {
        toast.error("Failed to delete email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email");
    }
  };
  console.log(emails, "emails");

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Sl No</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(emails) && emails.length > 0 ? (
              emails.map((email, index) => (
                <tr key={email._id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{email.email}</td>
                  <td className="border p-2">
                    {new Date(email?.date).toDateString()}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(email._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriptions;
