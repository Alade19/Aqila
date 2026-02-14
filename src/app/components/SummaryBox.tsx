"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { uploadicon, pasteicon, copyicon, uploadiconblue } from "../core/lib/utils";
import { useRef, useEffect } from 'react';
import GradientButton from "./GradientButton";
import Button from './Button';


function SummaryBox() {
    const { theme } = useTheme();

    const isDark = theme === 'dark';

    const [content, setContent] = useState("");
    // const contentRef = useRef<HTMLDivElement>(null);
    const [showtextarea , setshowtextarea] = useState(false);
    const [fileName, setFileName] = useState('')
    const [showfilename, setshowfilename] = useState(false);
    const [showbackbtn , setshowbackbtn] = useState(false);
    const [showbackbtn2 , setshowbackbtn2] = useState(false);
    const [showcopybtn , setshowcopybtn] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [texttosummarize, settexttosummarize] = useState("");
    const [enablenextbtn, setenablenextbtn] = useState(false);
    const [showmobile, setshowmobile] = useState(false);
    const [ShortorLong , setShortorLong] = useState("")
    
    const EnterText = () => {
        setshowtextarea(true);
        setshowbackbtn(true);
        setenablenextbtn(true);
        settexttosummarize("");
    }
    const PasteText = async () =>{
        setshowtextarea(true);
        setshowbackbtn(true);
        setenablenextbtn(true);
        settexttosummarize("");
        try {
            const clipboardText = await navigator.clipboard.readText();
            settexttosummarize(prev => prev + clipboardText); // Append clipboard text
        } catch (err) {
        console.error("Failed to read clipboard: ", err);
        }
    }
    const copyText = () => {
        const contentRef = document.getElementById('contentText') as HTMLInputElement
        if (contentRef) {
            const textToCopy = contentRef.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
              alert("Text copied to clipboard!");
            }).catch((err) => {
              console.error("Failed to copy:", err);
            });
          }
    }

    const backbtn = () => {
        setshowtextarea(false);
        settexttosummarize("");
        setshowbackbtn(false);
        setenablenextbtn(false);
        setshowcopybtn(false);
        setContent("");
        setshowmobile(false);
        setshowfilename(false)
        const input = document.getElementById('fileInput') as HTMLInputElement;
        if (input) input.value = ''; 
        setFileName('');     
    }

    const backbtn2 = () => {
        setshowbackbtn(true);
        setshowbackbtn2(false);
        setshowcopybtn(false);
        setContent("");
        setshowmobile(false);
    }

    const nextbtn = () => {
        if(enablenextbtn){
            setshowmobile(true);
            setshowbackbtn2(true);
            setshowbackbtn(false);
            setshowcopybtn(true);
            setContent(texttosummarize);
            console.log("Next button clicked"); 
        }
           
    }

    useEffect(() => {
        if (showtextarea && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(texttosummarize.length, texttosummarize.length);
        }
    }, [showtextarea, texttosummarize.length]);

    const handleFileButtonClick = () => {
        
        const input = document.getElementById('fileInput') as HTMLInputElement
        if (input) {
          input.click()
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            
            const allowedTypes = ['text/plain', 
                'application/pdf', 
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            const maxSize = 50 * 1024 // 50KB

            if (!allowedTypes.includes(file.type)) {
                alert('Only .txt, .pdf, and .docx files are allowed.')
                return
            }

            if (file.size > maxSize) {
                alert('File size must be 50KB or less.')
                return
            }

            setFileName(file.name)
            setshowfilename(true);
            setshowtextarea(false)
            setshowbackbtn(true);
            setenablenextbtn(true);
        }
    }
    
    return <div>

        <div className="">
            
            <div className="lg-custom-shadow rounded-[16px] dark:border-[1px] dark:border-white/50  bg-white dark:bg-[#1E1E1E]  grid grid-cols-1 lg:grid-cols-2 min-h-[430px] md:min-h-[450px] lg:min-h-[543px] ">
                {/* 111 */}
                <div className={`${!showmobile ? 'block' : 'hidden'} lg:block pl-[31px] pt-[52px] lg:pl-0 lg:pt-0`}>
                    <div className={`${!showtextarea && !showfilename ? 'block' : 'hidden'} h-full`}>
                        <div className="lg:py-8 lg:pl-8 flex flex-col justify-between h-full">
                            <div className="">
                                <button onClick={ () => EnterText() } className="font-[400] lg:pt-8 text-[12px] md:text-[20px] text-[#001F22] dark:text-white cursor-pointer bg-transparent">
                                    Enter text or paste to summarize</button>
                            </div>
                            <div className=" flex place-content-center">
                                <button onClick={ () => PasteText() } className="text-[#001F22] dark:text-white w-fit cursor-pointer bg-transparent">
                                    <div className="flex place-content-center mb-2 ">
                                        <div className="bg-[#F0FEFF] h-[36px] w-[36px] flex place-content-center rounded-[4px]">
                                            <Image src={pasteicon} alt="paste icon"  className="w-[17px] h-[23px] lg:h-[24px] lg:w-[24px] my-auto" />
                                        </div>
                                        
                                    </div>
                                    <span className="font-[500] text-[12px]">Paste Text</span>
                                </button>
                            </div>

                            <div className="pb-[24px] lg:pb-0">
                                <button onClick={() => handleFileButtonClick()} className="flex gap-1 cursor-pointer bg-transparent dark:text-[#0BB9CD]">
                                    <Image src={isDark ? uploadiconblue : uploadicon} alt="upload icon" className="w-[16px] h-[16px] lg:w-[27.06px] lg:h-[27.06px] dark:text-[#0BB9CD]"/>
                                    <span className="font-[500] text-[12px] h-fit my-auto md:text-[20.3px]">Upload Doc</span>
                                </button>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                    hidden
                                    accept=".txt,.pdf,.doc,.docx"
                                />
                            </div>
                        </div>
                    </div>

                    {/* textarea 11 */}
                    <div className={`${showtextarea && !showfilename ? 'block' : 'hidden'} lg:ml-6 lg:mr-12 overflow-hidden`}>
                        <div className="mt-6 lg:mt-26  w-full h-[300px] md:h-[320px] lg:h-[338px]">
                            <textarea ref={textareaRef} value={texttosummarize} onChange={(e) => settexttosummarize(e.target.value)} name="" id="" autoFocus className="bg-white dark:bg-[#1E1E1E] w-full h-full  text-[14px] lg:text-[18px] font-[400]  scrollbar-custom"></textarea>
                        </div>
                    </div>

                    {/* file name */}
                    <div className={`${!showtextarea && showfilename ? 'block' : 'hidden'}  h-full flex items-center justify-center`}>
                        <div className="text-[14px] lg:text-[18px] font-[500] text-[#303030] dark:text-white">
                            {fileName ? fileName : "No file selected"}
                        </div>
                        

                    </div>
                </div>
                
                


                <div className={`${showmobile ? 'block' : 'hidden'} lg:block`}>
                    <div className="flex  h-full">
                        <div className="hidden lg:block h-full w-[1px] bg-[#CCCCCC] dark:bg-white/50"></div>
                        <div className="h-full  lg:ml-8 lg:mr-4 w-full py-4 px-4 lg:px-0 lg:py-4">
                            <div className="border-b-[0.1px] border-[#CCCCCC] dark:border-[#CCCCCC] px-4 py-4 w-full flex justify-between">
                                <div className="my-auto h-fit flex gap-6">
                                    <button onClick={ () => { setShortorLong("short") }} className={`${ShortorLong === "short" ? 'bg-[#F0FEFF] dark:bg-[#001A0B]' : 'bg-none'} text-[13px] font-[500] px-[16px] py-[4px] rounded-[4px] dark:text-[#F0FEFF] text-[#001A0B]  cursor-pointer`}>Short</button>
                                    <button onClick={ () => { setShortorLong("long") }} className={`${ShortorLong === "long" ? 'bg-[#F0FEFF] dark:bg-[#001A0B]' : 'bg-none'} text-[13px] font-[500] px-[16px] py-[4px] rounded-[4px] dark:text-[#F0FEFF] text-[#001A0B]  cursor-pointer`}>Long</button>
                                </div>
                                <div className="my-auto h-fit">
                                    <button onClick={ () => copyText()} className={`${showcopybtn ? 'block' : 'hidden'} text-[10px] font-[500] text-[#001A0B] dark:text-white flex gap-1 cursor-pointer`}>
                                        <Image src={copyicon} alt="copy icon" />
                                        <span>Copy text</span>
                                    </button>
                                </div>
                            </div>

                            <div id="contentText" className=" text-[14px] lg:text-[18px] font-[400] mt-6 lg:mt-12 h-[300px] md:h-[320px] lg:h-[338px] mx-2 px-2  lg:mx-0 lg:pr-4 lg:mr-12 leading-7 overflow-y-auto scrollbar-custom">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>


            <div className="lg:gap-8 lg:mb-4 mt-8 lg:mt-12 flex justify-between lg:place-content-end">
                <div onClick={ () => {backbtn()}} className={`${showbackbtn ? 'block' : 'hidden'} w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]`}>
                    <Button text={"Back"} bg={"graybtn"} />
                </div>
                <div onClick={ () => {backbtn2()}} className={`${showbackbtn2 ? 'block' : 'hidden'} w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]`}>
                    <Button text={"Back"} bg={"graybtn"} />
                </div>

                <div onClick={ () => {nextbtn()}} className="w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]">
                    {enablenextbtn ? <GradientButton text={"Summarize"} type="button" /> : <Button text={"Summarize"} bg={"blue"} /> } 
                </div>
                
                {/* <button className="text-[#FFFFFF] text-[10px] lg:text-[14px] font-[700] px-[32px] py-[9px] rounded-[8px] bg-gradient-to-b from-[#0BB9CD] to-[#001F22] cursor-pointer">Summarize</button> */}
                
            </div>
        
        </div>
    </div>;
  }
  
  export default SummaryBox;