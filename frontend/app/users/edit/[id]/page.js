'use client'
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const { id } = React.use(params);

  const [data, setData] = useState({
    id: "0",
    name: "",
    email: ""
  });

  useEffect(() => {
    fetch('http://187.77.146.135:3001/employee/' + id)
      .then(res => res.json())
      .then(result => {
        if (Array.isArray(result) && result.length > 0) {
          setData(result[0]);
        } else {
          setData(result);
        }
      })
      .catch(err => console.error("Error fetching user data:", err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://187.77.146.135:3001/employee/edit/' + id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        alert(result.msg || result.message || "Updated successfully");
        window.location.href = '/users';
      })
      .catch(err => console.error("Error updating user:", err));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit User ID: {id}</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            value={data.name || ""}
            onChange={(event) => {
              setData(prev => ({
                ...prev,
                name: event.target.value
              }));
            }}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="text"
            placeholder="email"
            id="email"
            name="email"
            value={data.email || ""}
            onChange={(event) => {
              setData(prev => ({
                ...prev,
                email: event.target.value
              }));
            }}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
}