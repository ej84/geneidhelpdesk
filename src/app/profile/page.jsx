"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const page = () => {
  const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    dept: "",
    //type: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <Navbar />
      <div className="flex flex-col items-center text-center space-y-8 p-10">
        <h1 className="text-2xl">Profile</h1>
        <label className="mr-3 w-32">Your Name:</label>
        <input
          type="text"
          onChange={handleChange}
          className="inline outline-none p-5 w-2/3 h-12 rounded-sm"
          name="username"
          value={formData.username}
        />
        <label className="mr-3 w-32">Email: </label>
        <input
          onChange={handleChange}
          className="inline outline-none p-5 w-2/3 h-12 rounded-sm"
          name="email"
          value={formData.email}
          required
        />
      </div>
    </main>
  );
};

export default page;
