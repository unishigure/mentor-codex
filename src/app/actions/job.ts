"use server";

import { cookies } from "next/headers";

import { Job } from "@/lib/job";

export async function setJobCookie(job: string) {
  const validJobs = Object.values(Job).flatMap((role) => Object.keys(role));
  if (!validJobs.includes(job)) {
    throw new Error("Unsupported job");
  }
  const store = await cookies();
  store.set("job", job, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
