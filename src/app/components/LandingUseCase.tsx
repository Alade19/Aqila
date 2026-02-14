"use client";
import React from "react";
import Image from 'next/image';
import {usecaseimg1} from "../core/lib/utils";
import useScrollReveal from "../core/lib/useScrollReveal";


export default function LandingUseCase() {
    useScrollReveal();
    const UseCase = [
        {
            "head": "Instantly Create Smart Flashcards",
            "body": "Generate flashcards directly from your content to boost memory and improve recall perfect for active, focused studying."
        },
        {
            "head": "Simplify Complex Study Materials",
            "body": "Turn long notes, PDFs, textbooks, or even scanned handwritten pages into clear, concise summaries you can actually remembe"
        },
        {
            "head": "Study Faster, Even Last-Minute",
            "body": "Whether it’s days or hours before your exam, Aqila helps you focus on what matters with quick summaries and ready to-use flashcards."
        },
        {
            "head": "Organize and Track Your Learning",
            "body": "Create custom decks by subject or topic, monitor your progress, and stay on top of what you’ve learned — all in one place."
        }
    ]

   
  return (
    <div className="fade-up relative bg-[#DEFCFF] pb-[105px] md:pb-[180px] xl:pb-[350px] h-fit  w-full">
        <div className="absolute fade-up left-1/2 -translate-x-1/2 w-auto bottom-0">
            <Image src={usecaseimg1} alt="" className="w-auto"/> 
        </div>
        <div>
            <div className="pt-[24px]">
                <h1 className="text-[#001F22] text-[24px] xl:text-[48px] font-[600] text-center">Practical Use Cases of Aqila</h1>
                <p className="text-[#001F22] text-[12px] lg:text-[16px] xl:text-[24px] font-[400] text-center mt-[16px]">Real ways Aqila helps students learn<br /> faster and smarter.</p>
            </div>
            <div className="flex place-content-center mt-[48px] ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[64px]  w-[80%] md:w-[90%] xl:w-[70%] py-4">
                    {UseCase.map((cases, index) => (
                        <div key={index} className="fade-up bg-[#FFFFFF] rounded-[25px] py-[32px] px-[32px]">
                            <h1 className="text-[#001F22] text-[24px] font-[600] xl:w-[50%]">{cases.head}</h1>
                            <p className="text-[#757575] text-[20px] font-[400] xl:w-[88%] mt-[16px]">{cases.body}</p>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    </div>
  );
}

