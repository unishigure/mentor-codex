"use server";

import { cookies } from "next/headers";

export async function getShowProgressCookie(): Promise<boolean> {
  const store = await cookies();
  const showProgress = store.get("showProgress")?.value ?? "false";
  return showProgress === "true";
}

export async function setShowProgressCookie(value: boolean) {
  const store = await cookies();
  store.set("showProgress", value ? "true" : "false", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
