import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
    }
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/createticket");
    } else {
      router.push("/signin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <Link href="http://localhost:3000/">
        <img src="/GeneID.jpg" width="80" height="80" />
      </Link>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t space-x-5 from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <button className="p-3 font-bold">
          <Link href="http://localhost:3000">Home</Link>
        </button>
        <button onClick={handleClick} className="p-3 font-bold">
          Contact Us
        </button>
        {isLoggedIn ? (
          <>
            <button className="p-3 font-bold">
              <Link href="http://localhost:3000/profile">Profile</Link>
            </button>
            <button onClick={handleLogout} className="p-3 font-bold">
              Sign Out
            </button>
          </>
        ) : (
          <button className="p-3 font-bold">
            <Link href="http://localhost:3000/signin">Sign In</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
