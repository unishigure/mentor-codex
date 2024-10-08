"use client";

import { useState, useEffect } from "react";

import ContentTable from "@/components/content-table";
import CreateModal from "@/components/create-modal";
import { db } from "@/config/db";
import { Tale } from "@/types";

export default function Home() {
  // const [tails, setTails] = useState<Tale[]>([]);

  // const fetchTales = async () => {
  //   const res = await db.tales.toArray();
  //   res.forEach((value, index) => {
  //     value.id = (index + 1).toString();
  //   });
  //   setTails(res);
  // };

  // useEffect(() => {
  //   fetchTales();
  // }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ContentTable />
      <CreateModal />
    </section>
  );
}
