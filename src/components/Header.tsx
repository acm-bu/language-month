"use client";

import Link from "next/link";
import AuthButton from "./AuthButton";
import { SessionProvider } from "next-auth/react";

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          ACM Language Month
        </Link>
      </div>

      <div className="navbar-center">
        <nav className="menu menu-horizontal px-1">
          <li>
            <Link href="/" className="btn btn-ghost">
              Home
            </Link>
          </li>
          <li>
            <Link href="/languages" className="btn btn-ghost">
              Current Language
            </Link>
          </li>
        </nav>
      </div>

      <div className="navbar-end">
        <SessionProvider>
          <AuthButton />
        </SessionProvider>
      </div>
    </header>
  );
}
