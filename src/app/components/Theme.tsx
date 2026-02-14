"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { sun, moon } from "../core/lib/utils";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (mounted)
    return (
      <button
        type="button"
        className="cursor-pointer bg-[white] md:bg-[#EEEEEE] dark:bg-[#1E1E1E] rounded-[4px] p-[12px] [transition:background_20ms_ease-in,_color_0.15s]"
        title="Toggle theme"
        aria-label="Toggle theme"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        <Image src={resolvedTheme === "dark" ? sun : moon} alt="theme-icons" />
      </button>
    );
}
