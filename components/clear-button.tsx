"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";

import { db } from "@/config/db";

export default function ClearButton() {
  const router = useRouter();

  const clearData = async () => {
    await db.tales.clear();
    router.push("/");
  };

  return (
    <Button onClick={clearData} color="danger" size="sm" variant="flat">
      CLEAR TALES
    </Button>
  );
}
