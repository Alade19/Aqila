"use client";
import React, {  useState } from "react";
import Image from 'next/image';
import { flashcard1, flashcard2, flashcard3, flashcard4, summary1, summary2 } from "../core/lib/utils";
import useScrollReveal from "../core/lib/useScrollReveal";

export default function LandingHowWorks() {
    const [isFlashCard, setisFlashCard] = useState(true);
    useScrollReveal();

    const WorkProcess = [
        {
            "title": "Start by naming your deck: call your deck something you’ll remember to stay organise",
            "image": flashcard1,
            "type": "flashcard"
        },
        {
            "title": "Upload your notes or paste your text: Whether it’s lecture slides or handwritten gems, we’ve got you.",
            "image": flashcard2,
            "type": "flashcard"
        },
        {
            "title": <span>Sit back and watch your study-ready flashcards<br/>appear.</span>,
            "image": flashcard3,
            "type": "flashcard"
        },
        {
            "title": "Your custom cards are ready! Flip, review, and memorize like a pro.",
            "image": flashcard4,
            "type": "flashcard"
        },
        {
            "title": "Paste your text or upload a file. Click 'Summarize' to get a short and clear version right away.",
            "image": summary1,
            "type": "summary"
        },
        {
            "title": "Choose a short summary or a longer one, depending on what you need then copy text.",
            "image": summary2,
            "type": "summary"
        },
    ]

   

  return (
    <div className="fade-up w-full pb-[78px]">
        <h1 className="text-[#001F22] fade-up text-[24px] lg:text-[32px] xl:text-[48px] font-[600] text-center">How It works</h1>
        <p className="text-[#001F22] fade-up mt-2 text-[12px] lg:text-[20px] xl:text-[24px] font-[400] leading-4 lg:leading-6 xl:leading-7 text-center">Quickly extract the key points from your documents<br/>so you can focus on what matters most.</p>
        <div className="fade-up w-full flex place-content-center mt-[44px] lg:mt-[48px]">
            <div className="flex w-fit bg-[#DEFCFF] gap-[24px] py-1 px-2 rounded-[200px]">
                <button onClick={ () => {
                    setisFlashCard(true)
                }} className={`${isFlashCard ? "bg-[#0BB9CD] " : ""}, text-[#001F22] duration-500 ease-in-out py-1 px-8 rounded-[32px] text-[12px] md:text-[16px] font-[500] cursor-pointer `}>Flashcard</button>
                <button onClick={ () => {
                    setisFlashCard(false)
                }} className={`${!isFlashCard ? "bg-[#0BB9CD] " : ""}, text-[#001F22] duration-500 ease-in-out py-1 px-8 rounded-[32px] text-[12px] md:text-[16px] font-[500] cursor-pointer `}>Summaries</button>
            </div>
        </div>
        <div className="fade-up w-full flex place-content-center mt-[48px]">
            <div
                key={isFlashCard ? "flashcard" : "summary"}
                className="transition-opacity duration-500 ease-in-out opacity-100 animate-fade w-[85%] xl:w-[78%] grid grid-cols-1 md:grid-cols-2 gap-x-[60px] lg::gap-x-[80px] gap-y-[48px]">
                
                {WorkProcess.filter(works =>
                    isFlashCard ? works.type === "flashcard" : works.type === "summary"
                ).map((works, index) => (
                    <div key={index}>
                    <p className="text-[#001F22] mb-3 text-[12px] lg:text-[16px] xl:text-[20px] font-[500]">
                        {works.title}
                    </p>
                    <Image src={works.image} alt="" />
                    </div>
                ))}
                
            </div>
        </div>
        
    </div>
  );
}

