"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const timeStamp = new Date();

  function formatDateToMySQL(date) {
    const pad = (num) => (num < 10 ? "0" + num : num);

    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`
    );
  }

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    subject: "",
    email: "",
    description: "",
    date: formatDateToMySQL(timeStamp),
    dept: "",
    //type: "",
  });

  //const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setUsername(parsed.username);
      setFormData((prevState) => ({
        ...prevState,
        id: parsed.user_id,
        username: parsed.username,
        email: parsed.email,
      }));
      console.log(username);
    } else {
      router.push("/signin");
    }
  }, []);
  /*
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/signin");
    }
  }, []);
*/ /*
  const startingTicketData = {
    name: username,
    subject: "",
    description: "",
    status: "not started",
    category: "Hardware Issue",
  };*/
  /*
  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }
*/

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    //console.log(formData.date + " " + formData.dept + ": " + formData.subject);
    e.preventDefault();
    // Update Ticket if in Edit Mode(id !== "new")
    /*if (EDITMODE) {
      const resp = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });

      if (!resp.ok) {
        throw new Error("Failed to update ticket.");
      }
    }
    // Create Ticket if not in Edit Mode(id === "new")
    else {*/
    const resp = await fetch("/api/database/create_ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.id,
        username: formData.username,
        subject: formData.subject,
        email: formData.email,
        description: formData.description,
        date: formData.date,
        dept: formData.dept,
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      throw new Error(
        `Failed to create ticket. Status: ${resp.status}, Message: ${errorText}`
      );
    }
    //}
    router.refresh();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      {/* before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] */}

      <div className="relative flex flex-col space-y-4 text-center w-1/2">
        <h1 className="text-3xl text-sky-700 mt-10">
          Create A Ticket for IT Technical Help
        </h1>

        <div className="flex flex-col items-center p-5 text-sky-700 space-y-5">
          <label className="mr-3 w-32">Your Name:</label>
          <input
            type="text"
            onChange={handleChange}
            className="inline outline-none p-5 w-1/3 h-12 rounded-sm"
            name="username"
            value={formData.username}
          />
          <label className="mr-3 w-32">Email: </label>
          <input
            onChange={handleChange}
            className="inline outline-none p-5 w-1/3 h-12 rounded-sm"
            name="email"
            value={formData.email}
            required
          />

          <label className="mr-3 w-32">Category: </label>
          <select
            onChange={handleChange}
            className="inline outline-none p-5 w-1/3 h-16 rounded-sm"
          >
            <option>GetGeneID</option>
            <option>Organizer LIS</option>
            <option>Hardware</option>
          </select>
          <label className="mr-3 w-32">Subject: </label>
          <input
            onChange={handleChange}
            className="inline outline-none p-5 w-1/3 h-12 rounded-sm"
            name="subject"
            value={formData.subject}
          />

          <label className="mr-3 w-32">Tell Us More: </label>
          <textarea
            onChange={handleChange}
            className="inline outline-none w-1/2 h-20 rounded-sm"
            name="description"
            value={formData.description}
          />

          <label className="mr-3 w-32">Department</label>
          <select className="inline outline-none p-5 w-1/3 h-16 rounded-sm">
            <option onChange={handleChange} value={formData.dept}>
              Lab
            </option>
            <option onChange={handleChange} value={formData.dept}>
              Covid Lab
            </option>
            <option onChange={handleChange} value={formData.dept}>
              Accession
            </option>
            <option onChange={handleChange} value={formData.dept}>
              Verification
            </option>
            <option onChange={handleChange} value={formData.dept}>
              Sales
            </option>
          </select>

          <button
            onClick={handleSubmit}
            className="p-4 bg-sky-700 rounded-lg text-white font-bold"
          >
            Create Ticket
          </button>
        </div>
      </div>
      <div className="grid text-center mt-5 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            FAQ for GeneID Employee
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Guideline Articles for Basic Knowledge of GeneID.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Microsoft(MS) Office
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Try to find solution for technical trouble on Microsoft Office
            services and account.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Organizer/CovidLIS
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn what the Organizer/CovidLIS is and how they work for GeneID
            Lab.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Windows
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Troubleshoot problems on your Windows computer.
          </p>
        </a>
      </div>
    </main>
  );
};

export default page;
