"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthButton from "./AuthButton";
import { useSession, signOut } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
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
  const { data: session } = useSession();

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email or Password field is empty");
      return;
    }
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
      toast.error(data.error || "Something went wrong");
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email or Password field is empty");
      return;
    }
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Sign in failed. Please try again.");
    } else {
      onClose();
      toast.success("Signed in successfully!");
    }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-white dark:bg-[#141a26] rounded-xl shadow-lg w-full max-w-md p-6 space-y-6">
        {/* Logged-in view */}
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              Logged in as: {session.user?.email}
            </p>
            <button
              onClick={() => signOut()}
              className="w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-md bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex justify-around gap-2 mb-4">
              <button
                onClick={() => setActiveTab("signin")}
                className={`flex-1 py-2 rounded-md transition-colors cursor-pointer ${
                  activeTab === "signin"
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 rounded-md transition-colors cursor-pointer ${
                  activeTab === "signup"
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={activeTab === "signin" ? handleLogin : handleRegister}
              className="flex flex-col gap-4"
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
                className="w-full rounded-md bg-yellow-400 text-black font-medium py-2 hover:bg-yellow-500 transition-colors cursor-pointer"
              >
                {loading
                  ? "Loading..."
                  : activeTab === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            {/* Social login */}
            <div className="flex flex-col gap-3 mt-4">
              <AuthButton
                provider="google"
                label="Continue with Google"
                iconSrc={<BsGoogle />}
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 mt-4 transition-colors cursor-pointer"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
