"use client";

import { logout } from "@/actions/logout";
import { whoami } from "@/actions/whoami";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const v = async () => {
      const u = await whoami();

      if (u.result === "ERR") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }

    v();
  }, [])

  if (isLoggedIn) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
            U
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a>Profile</a></li>
          <li><button onClick={async () => { 
            logout() 
            setIsLoggedIn(false);
          }}>Logout</button></li>
        </ul>
      </div>
    );
  }

  return (
    <Link href="/auth" className="btn btn-primary">
      Login
    </Link>
  );
}
