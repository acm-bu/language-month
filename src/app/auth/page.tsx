"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  const redirectUrl = searchParams.get("redirect") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-base-100 px-4">
      <div className="w-full max-w-md">
        {isSignUp ? (
          <SignUpForm onToggle={() => setIsSignUp(false)} />
        ) : (
          <SignInForm onToggle={() => setIsSignUp(true)} />
        )}
        
        {redirectUrl !== "/" && (
          <div className="mt-4 text-center">
            <p className="text-sm text-base-content/70">
              You'll be redirected after signing in
            </p>
          </div>
        )}
      </div>
    </div>
  );
}