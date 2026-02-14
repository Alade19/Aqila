"use client";
import { reset } from "@/app/core/lib/utils";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SIGNIN } from "@/app/core/lib/routes";

function PasswordReset() {
  return (
    <div className="md:w-[60% h-full flex gap-y-[.5rem] flex-col md:justify-center items-center md:items-start">
      <Image src={reset} alt="checkmail icon" className="w3.5" />
      <header className="font-medium text-[1.5rem] md:text-[2rem] mt-[.8rem] text-[#001F22] full-line-height">
        All done
      </header>
      <p className="text-center md:text-left text-base">
        Your password has been reset.
      </p>
      <Link href={SIGNIN} className="w-full">
        <button
          type="button"
          className="bg-brand-gradient mt-[1rem] mb-[0.5rem] w-full h-[39px] md:h-[55px] rounded-lg text-white text-[12px] cursor-pointer">
          Log in
        </button>
      </Link>
    </div>
  );
}

export default PasswordReset;
