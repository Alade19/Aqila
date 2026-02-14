"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { orbit, logowhite, logoblue } from "../core/lib/utils";
import { SIGNIN, SIGNUP } from "../core/lib/routes";

function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSignUpSignIn = pathname === SIGNUP || pathname === SIGNIN;
  return (
    <div className="h-screen md:flex bg-white text-black">
      {/* <ThemeToggle /> */}
      <div className="md:hidden  py-[1.5rem] w-[80%] sm:w-[60%]  mx-auto">
        <Image src={logoblue} alt="aqila-logo" className="w-[40%]" />
        <div
          className={`${
            isSignUpSignIn ? "opacity-100 visible" : "opacity-0 invisible"
          } mt-[20px] text-[#001F22]`}>
          <p className="font-[500]  text-[1.5rem] full-line-height">
            Let’s turn your notes into knowledge.
          </p>
          <p className="font-[300] text-[1rem] full-line-height mt-[12px]">
            With Aqila, studying is easier, faster, and smarter.
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-center items-center bg-brand-gradient w-full md:max-w-[40%] lg:max-w-[35%] xl:max-w-[453px] h-[100vh] px-[3.5rem] md:px-[2rem] pt-[5rem]">
        <div className="flex w-full">
          <Image src={logowhite} alt="aqila-logo" />
        </div>
        <div className="mt-[48px] ">
          <p className="text-white font-[500] text-[2rem] full-line-height">
            Let’s turn your notes into knowledge.
          </p>
          <p className="text-white font-[300] text-[1.25rem] full-line-height mt-[22px]">
            With Aqila, studying is easier, faster, and smarter.
          </p>
        </div>
        <Image
          src={orbit}
          alt="orbit-image"
          className="w-[70%] mt-[66px]"
          placeholder="empty"
        />
      </div>
      <main className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[427px] mx-auto lg:mx-0 lg:ml-[5rem] md:h-[100vh]">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
