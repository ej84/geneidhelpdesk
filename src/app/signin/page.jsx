"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("api/database/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } else {
      console.error("Failed to sign in");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navbar />
      <div className="flex flex-col mt-10 space-y-10">
        <h1 className="text-4xl text-center">Sign In Now</h1>
        <form onSubmit={handleLogin} className="space-x-5">
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

          <button className="p-2 ml-3" type="submit">
            Login
          </button>
        </form>
        <button className="p-2 mt-2">
          <Link href="http://localhost:3000/register">
            New User? Register Here
          </Link>
        </button>
      </div>
    </main>
  );
}
