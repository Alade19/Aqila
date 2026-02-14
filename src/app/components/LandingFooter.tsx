"use client";
import React from "react";
import Image from 'next/image';
import {footerlogo} from "../core/lib/utils";
import {  useRouter } from "next/navigation";
import useScrollReveal from "../core/lib/useScrollReveal";

export default function LandingFooter() {
    const router = useRouter();
    useScrollReveal();

    

  return (
    <div className="w-full flex place-content-center py-[24px]">
      <div className=" w-[80%]">
        <div className="fade-up bg-[#DEFCFF] py-[54px] md:py-[63px] rounded-[32px] mt-6">
            <h1 className="text-[#001F22] text-[20px] md:text-[24px] lg:text-[32px] xl:text-[48px] font-[600] text-center ">Ready to Study Smarter?</h1>
            <p className="text-[#001F22] mt-[10px] lg:mt-[16px] text-[10px] md:text-[12px] lg:text-[16px] xl:text-[24px] xl:leading-7.5 font-[400] text-center ">Join thousands of learners using Aqila to simplify their<br />study routine and ace their exams. Start in seconds.</p>
            <div className="mt-[34px] lg:mt-[58px] flex place-content-center w-full">
                <button 
                    onClick={ () => {
                        router.push("/sign-up");
                    }}
                className="bg-gradient-to-b from-[#0BB9CD] hover:bg-gradient-to-b hover:to-[#0BB9CD] hover:from-[#001F22] duration-500 ease-in-out w-[144px] h-[32px]  lg:w-[181px] lg:h-[52px] text-[10px] lg:text-[14px] cursor-pointer to-[#001F22] rounded-[8px]  font-[500] lg:font-[700] text-[#FFFFFF]">Get Started</button>
            </div>
        </div>

        <div className="fade-up mt-12 lg:mt-16">
            <div className="w-full flex justify-between">
                <div>
                    <div>
                        <Image src={footerlogo} alt="logo" className="w-[50%] lg:w-auto" />
                    </div>
                    <p className="text-[#001F22] text-[10px] md:text-[12px] lg:text-[18px] xl:text-[24px] mt-3 font-[400] leading-4 lg:leading-6 xl:leading-7">Unlock Your Full Potential with<br />Smarter Studying, Powered by<br />Aqila</p>
                    
                </div>
                <div>
                    <p onClick={ () => {
                        router.push("/");
                    }}
                     className="text-[#0BB9CD] cursor-pointer mt-1 text-[10px] md:text-[12px] lg:text-[18px] xl:text-[24px] font-[500]">Home</p>
                    <p className="text-[#0BB9CD] cursor-pointer mt-2 text-[10px] md:text-[12px] lg:text-[18px] xl:text-[24px] font-[500]">Privacy Policy</p>
                    <p className="text-[#0BB9CD] cursor-pointer mt-2 text-[10px] md:text-[12px] lg:text-[18px] xl:text-[24px] font-[500]">Contact Us</p>
                </div>
            </div>
            <p className="text-[#001F22] text-[10px] lg:text-[14px] font-[400] mt-3">Copyright © Aqila. 2024 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

