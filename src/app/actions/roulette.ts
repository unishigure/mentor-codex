"use server";

import { cookies } from "next/headers";

export async function getIsMentorCookie(): Promise<boolean> {
  const store = await cookies();
  const isMentor = store.get("isMentor")?.value ?? "false";
  return isMentor === "true";
}

export async function setIsMentorCookie(value: boolean) {
  const store = await cookies();
  store.set("isMentor", value ? "true" : "false", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
