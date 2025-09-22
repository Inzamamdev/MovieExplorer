"use client";
import Main from "@/components/Main";

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import { useSession } from "next-auth/react";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Main />
    </>
  );
}
