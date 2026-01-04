"use server";

import { cookies } from "next/headers";

export async function setLocaleCookie(locale: string) {
  const validLocales = ["ja", "na"];
  if (!validLocales.includes(locale)) {
    throw new Error("Unsupported locale");
  }
  const store = await cookies();
  store.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
