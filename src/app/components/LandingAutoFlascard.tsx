"use client";
import React from "react";
import { autoflashimg1, autosummimg1 } from "../core/lib/utils";
import Image from 'next/image';
import useScrollReveal from "../core/lib/useScrollReveal";


export default function Home() {
    useScrollReveal();
    const AutoCard = [
        {
            "header": "Auto Flashcard Generator",
            "body": "Automatically generate flashcards from your material to supercharge your memory with active recall.",
            "image": autoflashimg1
        },
        {
            "header": "Smart Summaries",
            "body": "Quickly extract the key points from your documents so you can focus on what matters most.",
            "image": autosummimg1
        }
    ]
   

  return (
    <div className="fade-up flex place-content-center w-full">
      <div className=" py-6 w-[80%]">   
          {AutoCard.map((card, index) => (
            <div key={index} className=" fade-up w-full  lg:flex lg:justify-between mb-[64px]">
                <div className="flex place-content-center ">
                    <div className=" w-[90%] md:w-[70%] lg:w-[300px] xl:w-[425px] my-auto h-fit">
                        <p className="text-[24px]  xl:text-[48px] font-[600] text-[#001F22] leading-8 lg:leading-14 text-center lg:text-left">{card.header}</p>
                        <p className="mt-3 lg:mt-3 text-[12px] lg:text-[16px] xl:text-[24px] font-[400] text-[#001F22]  xl:leading-7 text-center lg:text-left">{card.body}</p>
                    </div>
                </div>
                
                <div className="flex place-content-center lg:place-content-end mt-4">
                    <Image src={card.image} alt={card.header} className="w-[98%] md:w-[90%] lg:w-[80%] xl:w-auto" />
                </div>
                
            </div>
          ))}
      </div>
    </div>
  );
}

