"use server";

import { cookies } from "next/headers";

import { LOCALES } from "@/lib/locale";

export async function getLocaleCookie(): Promise<string | null> {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? null;
  return locale;
}

export async function setLocaleCookie(locale: string) {
  if (!LOCALES.includes(locale)) {
    throw new Error("Unsupported locale");
  }
  const store = await cookies();
  store.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
}
