"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/database/signup", {
        username,
        password,
        email,
      });
      alert(response.data.message);
      router.push("/");
    } catch (error) {
      alert("Registration failed: " + error.response.data.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navbar />
      <div className="flex flex-col mt-10 space-y-10">
        <h1 className="text-4xl text-center">New User</h1>
        <form onSubmit={handleRegister} className="space-x-5">
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Username"
              className="p-2 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Email"
              className="p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button className="p-3 my-5 mr-5" type="submit">
              Sign up
            </button>
          </div>
        </form>
        <button className="p-3 relative bottom-5">
          <Link href="http://localhost:3000/signin">
            Existing user? Sign in now
          </Link>
        </button>
      </div>
    </main>
  );
}
