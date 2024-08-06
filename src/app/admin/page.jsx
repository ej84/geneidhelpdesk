"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("api/database/tickets")
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
        <h1 className="text-2xl">Dashboard For Admin</h1>
      </div>
      <div>
        <div className="flex flex-col p-14">
          <Link
            href="http://localhost:3000/admin/tickets"
            className="text-2xl text-sky-700 m-3"
          >
            Tickets
          </Link>
        </div>
        <div className="p-14">
          <Link
            href="http://localhost:3000/articles"
            className="text-2xl text-sky-700 m-3"
          >
            Instructions for GeneID User
          </Link>
          {/* {ticket ? (
            <table className="bg-white">
              <thead className="bg-sky-600 text-white">
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
                  <td className="p-10">{ticket.user_id}</td>
                  <td className="p-10">{ticket.subject}</td>
                  <td className="p-10">{ticket.status}</td>
                  <td className="p-10">{ticket.description}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div></div>
          )} */}
        </div>
        <div className="p-14">
          <Link
            href="http://localhost:3000/users"
            className="text-2xl text-sky-700 m-3"
          >
            Users
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
