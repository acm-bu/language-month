"use client";

import { ImGithub } from "react-icons/im";
import { signIn } from "next-auth/react";


export default function AuthPage() {
  const handleSignIn = () => {
    signIn("github");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-base-100 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center mb-6">Sign In</h2>
            
            <button 
              onClick={handleSignIn}
              className="btn btn-outline btn-primary w-full gap-2"
            >
              <ImGithub className="w-5 h-5" />
              Sign in with GitHub
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-base-content/70">
                You'll be redirected after signing in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
