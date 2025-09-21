"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useAuth(onClose?: () => void) {
  const [loading, setLoading] = useState(false);

  const auth = async (
    type: "login" | "register",
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email or Password field is empty");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      // If registering, call API first
      if (type === "register") {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || "Something went wrong");
          return;
        }
      }

      // Sign in for both login & register
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Sign in failed. Please try again.");
      } else {
        onClose?.();
        toast.success(
          type === "register"
            ? "Registered & signed in successfully!"
            : "Signed in successfully!"
        );
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login: (e: React.FormEvent, email: string, password: string) =>
      auth("login", e, email, password),
    register: (e: React.FormEvent, email: string, password: string) =>
      auth("register", e, email, password),
  };
}
