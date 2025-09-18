"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      onClose();
    } else {
      alert(data.error || "Something went wrong");
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      onClose();
    }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white dark:bg-[#141a26] rounded-xl shadow-lg w-[90%] max-w-md p-6">
        {/* Tabs */}
        <div className="flex mb-6 justify-around">
          <button
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-2 rounded-md ${
              activeTab === "signin"
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 rounded-md ${
              activeTab === "signup"
                ? "bg-yellow-400 text-black font-semibold"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            Create Account
          </button>
        </div>
        <form
          onSubmit={activeTab === "signin" ? handleLogin : handleRegister}
          className="space-y-3"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-yellow-400 text-black font-medium py-2 hover:bg-yellow-500"
          >
            {loading
              ? "Loading..."
              : activeTab === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* Content */}
        {activeTab === "signin" ? (
          <div className="flex flex-col gap-4">
            <AuthButton
              provider="google"
              label="Sign in with Google"
              iconSrc="/google-icon.svg"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AuthButton
              provider="google"
              label="Create Account with Google"
              iconSrc="/google-icon.svg"
            />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
