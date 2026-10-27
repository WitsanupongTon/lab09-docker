'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch('http://187.77.146.135:3001/employee/')
      .then(res => res.json())
      .then(result => {
        setUsers(result);
      })
      .catch(err => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (confirm(`คุณต้องการลบผู้ใช้งาน ID: ${id} ใช่หรือไม่?`)) {
      fetch('http://187.77.146.135:3001/employee/delete/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(result => {
          alert(result.message);
          if (result.status === "OK") {
            fetchUsers();
          }
        })
        .catch(err => console.error("Error deleting user:", err));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <Link 
          href={'/users/createUser'} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create User
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                ID: {user.id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">{user.email}</p>
            
            {/* โซนปุ่ม Edit และ Delete */}
            <div className="flex gap-2 border-t pt-3 mt-auto">
              <Link 
                href={'/users/edit/' + user.id}
                className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-1.5 rounded transition"
              >
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(user.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}