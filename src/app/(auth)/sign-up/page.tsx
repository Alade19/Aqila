"use client";
import React from "react";
import AuthForm from "./AuthForm";

function SignUp() {
  return (
    <div className="h-full w-full flex flex-col md:justify-center mt-[1rem] md:mt-0">
      <header className="font-medium text-[1.5rem] md:text-[2rem] flex items-start w-full text-[#001F22] full-line-height mb-[2rem]">
        Sign up
      </header>
      

      <AuthForm mode="signup" />
      
      
    </div>
  );
}

export default SignUp;
