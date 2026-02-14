"use client";
import React from "react";
import Image from 'next/image';
import {navbarlogo, navbarimg1, navbarimg2 } from "../core/lib/utils";
import {  useRouter } from "next/navigation";
import useScrollReveal from "../core/lib/useScrollReveal";

export default function LandingNavBar() {
    const router = useRouter();
    useScrollReveal();
   
  return (
    <div className="bg-yellow-500 relative">
        <div className="absolute -z-10 top-4 lg:top-[32px] left-1/2 -translate-x-1/2 w-[90%] h-auto">
            <Image src={navbarimg1} alt="logo" className="w-full h-auto " />
        </div>
        <div className="absolute fade-up top-[200px] -z-10 md:top-[310px] lg:top-[450px] xl:top-[546px] left-1/2 -translate-x-1/2 w-[76%] h-auto">
            <Image src={navbarimg2} alt="logo" className="w-full h-auto" />
        </div>
        <div className="z-20">
            <div className="absolute top-6 md:top-8 lg:top-[76px] left-1/2 -translate-x-1/2 bg-[#FFFFFF] rounded-[64px] w-[80%] xl:w-[65%]  flex justify-between py-[5px] md:py-[10px] px-[24px] lg:py-[15px] lg:px-[32px] shadow-[0px_8px_18px_#3030301A,0px_33px_33px_#30303017,0px_75px_45px_#3030300D,0px_133px_53px_#30303003,0px_208px_58px_#30303000]">
                <div className="my-auto  h-fit">
                    <Image src={navbarlogo} alt="logo" className="w-[50%] md:w-[70%] lg:w-[100%]"/>
                </div>
                <div className="flex gap-[24px] my-auto h-fit">
                    <button onClick={ () => {
                        router.push("/sign-in");
                    }} className="hidden hover:bg-[#001F22]/80 hover:border-0  hover:text-[#ffffff] duration-300 ease-in-out lg:block z-50 cursor-pointer border-[1px] border-[#001F22] rounded-[8px] text-[10px] font-[600] lg:text-[14px] lg:font-[700] text-[#001F22] w-[5rem] h-[2.25rem] lg:w-[8.6875rem] lg:h-[2.75rem]">Log in</button>
                    <button onClick={ () => {
                        router.push("/sign-up");
                    }} className="bg-gradient-to-b  from-[#0BB9CD] to-[#001F22] hover:bg-gradient-to-b hover:to-[#0BB9CD] hover:from-[#001F22] duration-500 ease-in-out cursor-pointer rounded-[8px] text-[8px] md:text-[10px] font-[600] lg:text-[14px] lg:font-[700] text-[#FFFFFF] w-[6rem] h-[1.8rem] lg:w-[8.6875rem] lg:h-[2.75rem]">Sign up</button>
                </div>
            </div>

            <div className="fade-up absolute top-20 md:top-30 lg:top-50 xl:top-[230px] left-1/2 -translate-x-1/2 w-[60%] ">
                <h1 className="text-[#001F22] text-[12px] md:text-[24px] lg:text-[32px] xl:text-[48px] font-[600] text-center">Study Smarter. Learn Faster.</h1>
                <p className="text-[#001F22] mt-2 lg:mt-4 text-[8px] md:text-[14px] lg:text-[18px] xl:text-[24px] font-[400] text-center lg:leading-6 xl:leading-7">Your personal AI that turns notes into summaries, <br />questions, and flashcards in seconds.</p>
                <div className="mt-4 md:mt-8 xl:mt-16 flex place-content-center w-full">
                    <button
                        onClick={ () => {
                            router.push("/sign-up");
                        }}
                     className="bg-gradient-to-b from-[#0BB9CD] cursor-pointer to-[#001F22] hover:bg-gradient-to-b hover:to-[#0BB9CD] hover:from-[#001F22] duration-500 ease-in-out rounded-[8px] text-[10px] lg:text-[14px] font-[500] lg:font-[700] text-[#FFFFFF] w-[8rem] h-[2rem] lg:w-[11.3125rem] lg:h-[3.25rem]">Get Started</button>
                </div>
            </div>
        </div>
        
    </div>
  );
}

