"use client";
import React from "react";
import  { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { uploadicon, pasteicon, copyicon, uploadiconblue } from "../../core/lib/utils";
import { getSummaryAction } from "@/app/core/services/actions/userActions";
import GradientButton from "../../components/GradientButton";
import Button from '../../components/Button';
import { toast } from "sonner";
import SmallLoader from "@/app/components/SmallLoader";

// Define the DataToSendType type
type DataToSendType = {
  file: FileList | null;
  text: string;
};

// Define the ResponseType type to match the expected summaryText structure
type ResponseType = {
  short: string;
  long: string;
};

function Page() {
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  
  const [summaryText, setSummaryText] = useState<ResponseType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activeSummaryType, setActiveSummaryType] = useState<"short" | "long">(
    "short"
  );
  const [dataToSend, setDataToSend] = useState<DataToSendType>({
    file: null,
    text: "",
  });
  const [showmobile, setshowmobile] = useState(false);


  const summaryMutation = useMutation({
    mutationFn: (formData: FormData) => getSummaryAction(formData),
    mutationKey: ["summarize"],
    onSuccess: (data) => {
      setshowmobile(true)
      
      if (typeof data === "object" && data !== null && "short" in data && "long" in data) {
        setSummaryText(data as ResponseType);
      } else {
        setSummaryText({ short: String(data), long: String(data) });
      }
      toast.success("Summary retrieved successuflly");
    },
    onError: (error: Error) => {
      toast.error(error.message);
      console.error(error);
      setshowmobile(false)
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  

  const handleSummarize = () => {
    setIsLoading(true);
    setshowmobile(true);
    const formData = new FormData();

    if (dataToSend.file && dataToSend.file.length > 0) {
      console.log(dataToSend.file[0])
      formData.append("file", dataToSend.file[0]);
      
    } else if (dataToSend.text.trim() !== "") {
      formData.append("text", dataToSend.text.trim());
    } else {
      toast.error("Please provide text or upload a document.");
      setIsLoading(false);
      return;
    }

    
    summaryMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value) {
      setDataToSend((prev) => ({
        ...prev,
        text: value,
      }));
    } else if (value === "") {
      setActiveSummaryType("short");
      setSummaryText(null); //SET SUMMARY BACK TO EMPTY WHEN THE TEXT IS CLEARED
      setDataToSend((prev) => ({
        ...prev,
        text: "",
      }));
    }
  };
  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setDataToSend((prev) => ({
        ...prev,
        text: text,
      }));
    } catch (err) {
      toast.error("please try again");
      console.log(err)
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxSizeInBytes = 2 * 1024 * 1024;
    if (files  && files.length > 0) {
      if (files[0].type === "application/pdf"){
        if (files[0].size > maxSizeInBytes) {
          toast.error('File size must be less than 2MB');
          e.target.value = ''; 
          return;
        }
        setDataToSend((prev) => ({
          ...prev,
          file: files,
        }));
        toast.success("File uploaded successfully");
      }else{
        toast.error("Only PDF files are supported.");
      }
      
    } else {
      toast.error("Something went wrong, please try again");
    }
  };
  const handleCopy = () => {
    if (summaryText) {
      navigator.clipboard.writeText(summaryText?.long || summaryText?.short);
      setTimeout(() => setIsCopied(false), 1000);
      setIsCopied(true);
    }
  };
  

  return <div className="">
    <div className="lg:mt-2  text-[#001F22]">
      <h1 className="font-[600] text-[24px] md:text-[32px] dark:text-[#0BB9CD]">Summarize</h1>
      <p className="font-[400] text-[16px] md:text-[15px] dark:text-[#FFFFFF]">What do you want to Summarize today?</p>
    </div>

    <div className="mt-6 lg:mt-8">
      {/* here */}
      <div className="">
            
        <div className="lg-custom-shadow rounded-[16px] dark:border-[1px] dark:border-white/50  bg-white dark:bg-[#1E1E1E]  grid grid-cols-1 lg:grid-cols-2 min-h-[430px] md:min-h-[450px] lg:min-h-[543px] ">
            {/* 111 */}
            <div className={`${!showmobile ? 'block' : 'hidden'} lg:block pl-[31px] pt-[52px] lg:pl-0 lg:pt-0`}>
              
                <div className=" relative h-full">
                    <div className="lg:py-8 lg:pl-8 flex flex-col justify-between h-full">
                      {!dataToSend.file && (
                        <div className={`${dataToSend.text ? "h-full" : ""}  lg:mr-12`}>
                            <textarea name="" id="" 
                              value={dataToSend.text}
                              onChange={handleInputChange}
                              placeholder="Enter text or paste to summarize"
                              className="font-[400] scrollbar-custom w-full h-full lg:pt-8 placeholder:text-[12px] md:placeholder:text-[20px] text-[12px] md:text-[20px] placeholder:text-[#001F22] dark:placeholder:text-white text-[#001F22] dark:text-white  bg-transparent">
                            </textarea>
                        </div>
                      )}

                        {!dataToSend.text && !dataToSend.file && (
                          <div className=" flex place-content-center">
                            <button onClick={handlePasteClick} className="text-[#001F22] dark:text-white w-fit cursor-pointer bg-transparent">
                                <div className="flex place-content-center mb-2 ">
                                    <div className="bg-[#F0FEFF] h-[36px] w-[36px] flex place-content-center rounded-[4px]">
                                        <Image src={pasteicon} alt="paste icon"  className="w-[17px] h-[23px] lg:h-[24px] lg:w-[24px] my-auto" />
                                    </div>
                                    
                                </div>
                                <span className="font-[500] text-[12px]">Paste Text</span>
                            </button>
                          </div>
                          
                        )}
                        
                        {!dataToSend.text && (
                          <div>
                            {dataToSend.file ? <div
                              onClick={() => {
                                setSummaryText(null);
                                setActiveSummaryType("short");
                                setDataToSend(prev => ({
                                  ...prev,
                                  file: null
                                }));
                              }}
                              className={`${dataToSend.file ? "absolute bottom-6" : "pb-[24px] lg:pb-0"} }`}>
                              <button className="flex gap-1 cursor-pointer bg-transparent dark:text-[#0BB9CD]">
                                <Image src={isDark ? uploadiconblue : uploadicon} alt="upload icon" className="w-[16px] h-[16px] lg:w-[27.06px] lg:h-[27.06px] dark:text-[#0BB9CD]"/>
                                <span  className="font-[500] text-[12px] h-fit my-auto md:text-[20.3px]">Remove Doc</span>
                              </button>
                              
                            </div>
                            :<div 
                              onClick={() =>
                                document.getElementById("summary-file-upload")?.click()
                              } 
                              className={`${dataToSend.file ? "absolute bottom-6" : "pb-[24px] lg:pb-0"} }`}>
                              <button className="flex gap-1 cursor-pointer bg-transparent dark:text-[#0BB9CD]">
                                  <Image src={isDark ? uploadiconblue : uploadicon} alt="upload icon" className="w-[16px] h-[16px] lg:w-[27.06px] lg:h-[27.06px] dark:text-[#0BB9CD]"/>
                                  <span className="font-[500] text-[12px] h-fit my-auto md:text-[20.3px]">
                                    Upload Doc
                                    {/* <span className="text-[8px]">(.pdf)</span> */}
                                  </span>
                              </button>
                              
                            </div> }
                            
                            <input
                                id="summary-file-upload"
                                type="file"
                                accept=".pdf"
                                hidden
                                onChange={(e) => handleFileUpload(e)}
                              />
                          </div>
                        )}
                        {dataToSend.file && (
                          <div className="absolute bottom-1/2 w-[90%] flex place-content-center">
                            <div className=" text-[14px] lg:text-[18px] font-[500] text-[#303030] dark:text-white">
                              {dataToSend.file[0]?.name}
                            </div>
                          </div>
                          
                        )}
                    </div>
                </div>
                
            </div>
            
            


            <div className={`${showmobile ? 'block' : 'hidden'} lg:block`}>
                <div className="flex  h-full">
                    <div className="hidden lg:block h-full w-[1px] bg-[#CCCCCC] dark:bg-white/50"></div>
                    <div className="h-full  lg:ml-8 lg:mr-4 w-full py-4 px-4 lg:px-0 lg:py-4">
                        <div className="border-b-[0.1px] border-[#CCCCCC] dark:border-[#CCCCCC] px-4 py-4 w-full flex justify-between">
                            <div className="my-auto h-fit flex gap-6">
                                {/* <button  className={`${ShortorLong === "short" ? 'bg-[#F0FEFF] dark:bg-[#001A0B]' : 'bg-none'} text-[13px] font-[500] px-[16px] py-[4px] rounded-[4px] dark:text-[#F0FEFF] text-[#001A0B]  cursor-pointer`}>Short</button> */}
                                <button 
                                onClick={ () => {setActiveSummaryType("short")}}  
                                className={`${activeSummaryType === "short" ? 'bg-[#F0FEFF] dark:bg-[#001A0B]' : 'bg-none'} text-[13px] font-[500] px-[16px] py-[4px] rounded-[4px] dark:text-[#F0FEFF] text-[#001A0B]  cursor-pointer`}>
                                  Short</button>

                                <button 
                                  onClick={ () => {setActiveSummaryType("long")}}
                                  className={`${activeSummaryType === "long" ? 'bg-[#F0FEFF] dark:bg-[#001A0B]' : 'bg-none'} text-[13px] font-[500] px-[16px] py-[4px] rounded-[4px] dark:text-[#F0FEFF] text-[#001A0B]  cursor-pointer`}>
                                    Long</button>
                            </div>
                            <div className="my-auto h-fit">
                                <button onClick={handleCopy} className="text-[10px] font-[500] text-[#001A0B] dark:text-white flex gap-1 cursor-pointer">
                                    <Image src={copyicon} alt="copy icon" />
                                    {!isCopied ? <span>Copy text</span>:<span>Copied</span>}
                                </button>
                            </div>
                        </div>
                        {isLoading && (
                          <div className=" mt-6 lg:mt-12 h-[70%] flex justify-center items-center">
                            <SmallLoader />
                          </div>
                          
                        )} 
                        {!isLoading && (
                          <div id="summaryText" className=" text-[14px] lg:text-[18px] font-[400] mt-6 lg:mt-12 h-[300px] md:h-[320px] lg:h-[338px] mx-2 px-2  lg:mx-0 lg:pr-4 lg:mr-12 leading-7 overflow-y-auto scrollbar-custom">
                            {activeSummaryType === "short"
                              ? summaryText?.short
                              : summaryText?.long}
                          </div>
                        )}
                        
                    </div>
                </div>
            </div>
            
            
        </div>


        <div className="lg:gap-8 lg:mb-4 mt-8 lg:mt-12 flex place-content-end">
            {summaryText ? 
              <div onClick={ () =>{
                setActiveSummaryType('short')
                setSummaryText(null)
                setshowmobile(false)
              }}
               className=" w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]">
                <Button text={"Back"} bg={"graybtn"} />
              </div> : 
              <div onClick={handleSummarize} className="w-[94px] h-[30px] lg:w-[139px] lg:h-[44px]">
                {dataToSend.file || dataToSend.text ? <GradientButton text={"Summarize"} type="button" /> : <Button text={"Summarize"} bg={"blue"} /> } 
            </div>
            }
        </div>
        
        </div>
    </div>

  </div>;
}

export default Page;
