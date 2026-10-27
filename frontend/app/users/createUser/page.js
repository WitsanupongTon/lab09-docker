'use client'
import React from "react";

export default function CreateUserPage() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // ดึงค่าจาก input field ในฟอร์ม
    const data = {
      id: event.target.id.value,
      name: event.target.name.value,
      email: event.target.email.value
    };

    // ส่งข้อมูลไปหา Backend
    fetch('http://187.77.146.135:3001/employee/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(result => {
        alert(result.message);
        if (result.status === "OK") {
          window.location.href = '/users';
        }
      })
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="id">ID: </label>
          <input 
            type="text" 
            id="id" 
            name="id" 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
          />
        </div>

        <div>
          <label htmlFor="name">Name: </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }} 
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}