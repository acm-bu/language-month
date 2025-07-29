"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function AuthButton() {
  const { status, data  } = useSession();

  if (status === "authenticated") {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {data?.user?.image ? (
              <Image 
                src={data.user.image} 
                width={64}
                height={64}
                alt="User avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary text-primary-content flex items-center justify-center rounded-full">
                U
              </div>
            )}
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a>Profile</a></li>
          <li><button onClick={async () => { 
            await signOut() 
          }}>Sign Out</button></li>
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
