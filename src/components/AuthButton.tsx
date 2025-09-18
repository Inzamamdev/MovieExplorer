"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
interface AuthButtonProps {
  provider: "google" | "github" | "facebook" | string;
  label: string;
  iconSrc?: string;
}

export default function AuthButton({
  provider,
  label,
  iconSrc,
}: AuthButtonProps) {
  return (
    <button
      onClick={() => signIn(provider)}
      className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {iconSrc && <Image src={iconSrc} alt={label} className="w-5 h-5" />}
      {label}
    </button>
  );
}
