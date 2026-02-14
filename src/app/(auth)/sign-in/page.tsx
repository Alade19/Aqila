"use client";
import AuthForm from "../sign-up/AuthForm";
import React from "react";

function SignIn() {
  return (
    <div className="h-full w-full flex flex-col md:justify-center mt-[1rem] md:mt-0">
      <header className="font-medium text-[1.5rem] md:text-[2rem] flex items-start w-full text-[#001F22] full-line-height mb-[2rem]">
        Sign in
      </header>
      <AuthForm mode="signin" />
    </div>
  );
}

export default SignIn;
