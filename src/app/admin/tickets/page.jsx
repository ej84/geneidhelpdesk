"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("../api/database/tickets")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTicket(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Navbar />
      <div className="p-10">
        <h1 className="text-2xl">Tickets</h1>
      </div>

      {ticket ? (
        <table className="bg-white">
          <thead className="bg-sky-700 text-white">
            <tr>
              <th className="p-5">Ticket No</th>
              <th className="p-5">Username</th>
              <th className="p-5">Subject</th>
              <th className="p-5">Status</th>
              <th className="p-5">User Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-10">{ticket.ticket_id}</td>
              <td className="p-10">{ticket.name}</td>
              <td className="p-10">{ticket.subject}</td>
              <td className="p-10">{ticket.status}</td>
              <td className="p-10">{ticket.description}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default page;
