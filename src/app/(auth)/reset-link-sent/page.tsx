"use client";
import React from "react";
import Image from "next/image";
import { checkmail } from "@/app/core/lib/utils";

export default function ResetPassWord() {
  return (
    <div className="h-full flex gap-y-[.5rem] flex-col justify-center items-center md:items-start">
      <Image src={checkmail} alt="checkmail icon" className="w3.5" />
      <header className="font-medium text-[1.5rem] md:text-[2rem] mt-[.8rem] text-[#001F22] full-line-height">
        Check your mail
      </header>
      <p className="text-center md:text-left text-base">
        We have sent a password recovery
        <br className=" md:hidden" /> instructions to{" "}
        <br className="hidden md:block" /> your mail
      </p>
    </div>
  );
}
