"use client";
import { useModal } from '../core/contexts/ModalContext';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { 
    closemodalblack, 
    closemodalwhite, 
    flashuploadblack,
    flashpasteblack,
} from "../core/lib/utils";
import Button from './Button';
import {  useRouter } from "next/navigation";
import Loader from './Loader';
import { useCallback } from 'react';
import { useMutation } from "@tanstack/react-query";
import { postDeckAction, postFlashcardAction } from "@/app/core/services/actions/userActions"
import { toast } from "sonner";


// type ResponseType = {
//   id: number;
//   name: string;
// };

export default function FlashCardModal() {
  const { isFlashcardOpen, closeFlashcard } = useModal();
  const router = useRouter();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
      
  const [deckName, setdeckName] = useState("");
  const [pageoption, setpageoption] = useState("");
  const [studytext, setstudytext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deckId, setdeckId ] = useState<string | null>(null)
  

  const [isnamedeck, setisnamedeck] = useState(true);
  const [isgenflashcard, setisgenflashcard] = useState(false);
  const [isuploadpage, setisuploadpage] = useState(false);
  const [ispastepage, setispastepage] = useState(false);
  const [uploadfile, setuploadfile] = useState(false);
  // const [afterfileupload, setafterfileupload] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  const [uploadProgress, setUploadProgress] = useState(0)



  const createDeckMutation = useMutation({
    mutationFn: postDeckAction,
    mutationKey: ["createDeck"],
    onSuccess: (data) => {
      toast.success("Deck created successfully!");
      
      setdeckId(data);
      setisnamedeck(false);
      setisgenflashcard(true);
    },
    onError: (error: Error) => {
      toast.error("Failed to create deck: " + error.message);
    },
    onSettled: () => {
      setisnamedeck(false);
      setisgenflashcard(true);
    },
  });

  const nextDeck = () => {
    if (!deckName.trim()) {
      toast.error("Please enter a deck name");
      return;
    }

    // setIsLoading(true); // optional loading state
    createDeckMutation.mutate({ name: deckName.trim() });
      
  };

  const createFlashcardMutation = useMutation({
    mutationFn: ({ deckId, formData }: { deckId: string; formData: FormData }) =>
      postFlashcardAction(deckId, formData),
    mutationKey: ["createFlashcard"],
    onSuccess: (data) => {
      toast.success("Flashcard created successfully!");
      console.log("Flashcard data:", data);
      // Optionally update UI or clear form
    },
    onError: (error: Error) => {
      toast.error("Error creating flashcard: " + error.message);
      console.error("Flashcard creation failed:", error);
    },
    onSettled: () => {
      // setIsLoading(false); // or stop button spinner
    },
  });
   
  const handleFileUpload = (file: File) => {
    setSelectedFile(file)
    setUploadProgress(0)

    // Simulate upload
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress === 100) clearInterval(interval)
    }, 150)
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setUploadProgress(0)
  }
  
 
  const textField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 100000) {
      setstudytext(value);
    }
  };

   

    const backtoDeck = () => {
      setisnamedeck(true);
      setisgenflashcard(false);
      setpageoption("");
    }
    

    const nextFlashcard = (pageoption: string) => {
      
        if (pageoption === "upload") {
          setisgenflashcard(false);
          setisuploadpage(true);
          setispastepage(false);
          setuploadfile(true);
          console.log(deckId)
        } else if (pageoption === "paste") {
          setisgenflashcard(false);
          setispastepage(true);
          setisuploadpage(false);
          console.log(deckId)
        } else {
            toast.error("Please select a method");
            return;
        }
    };

    const uploadtoflash = () => {
      setisuploadpage(false);
      setisgenflashcard(true);
      setSelectedFile(null);
    }
    const backtopaste = () => {
      setispastepage(false);
      setisgenflashcard(true);
      setstudytext("");
    }
    

  

  const clearmodal = useCallback(() => {
    closeFlashcard();  
    setdeckName("");
    setpageoption("");
    setisnamedeck(true);
    setisgenflashcard(false);
    setisuploadpage(false);
    setispastepage(false);
    setuploadfile(false);
    setSelectedFile(null);
    setstudytext("");
    // setafterfileupload(false);
    setUploadProgress(0);
  }, [closeFlashcard]);

  useEffect(() => {    
    if (!isLoading) return;

    const checkRoute = () => {
      if (window.location.pathname === '/flashcards') {
        setIsLoading(false);
        clearmodal();
      }
    };

    const interval = setInterval(checkRoute, 100);

    return () => clearInterval(interval);
  }, [isLoading, clearmodal]);

  // const uploaddone = () => {
  //   if (selectedFile) {
  //     setIsLoading(true);
  //     router.push("/flashcards");
  //   }
  // };
  // const afterTextPaste = () => {
  //   if (studytext.trim() !== "") {
  //     setIsLoading(true);
  //     router.push("/flashcards");
  //   } else {
  //     alert("Please paste some text");
  //     return;
  //   }
  // }

  const uploaddone = () => {
  if (!selectedFile || !(selectedFile instanceof File)) {
    toast.error("Please upload a valid file.");
    return;
  }

  if (!deckId) {
    toast.error("Deck ID is missing.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile); 

  // setIsLoading(true);

  createFlashcardMutation.mutate({ deckId, formData });
  for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
};

  const afterTextPaste = () => {
  if (!studytext.trim()) {
    toast.error("Please paste some text.");
    return;
  }

  if (!deckId) {
    toast.error("Deck ID is missing.");
    return;
  }

  const formData = new FormData();
  formData.append("text", studytext.trim());

  // setIsLoading(true);

  createFlashcardMutation.mutate({ deckId, formData });
  for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
};

  // const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (event.target === event.currentTarget) {
  //     closeFlashcard();
  //     setdeckName("");
  //     setpageoption("");
  //     setisnamedeck(true);
  //     setisgenflashcard(false);
  //     setisuploadpage(false);
  //     setispastepage(false);
  //     setuploadfile(false);
  //     setSelectedFile(null);
  //     setstudytext("");
  //     // setafterfileupload(false);
  //     setUploadProgress(0);
  //   }
  // };

  // if (!isOpen) return null;
  if (!isFlashcardOpen) return null;

  return (
    <>
    {isLoading && (
        <div className="">
          <Loader />
        </div>
      )}
    {!isLoading && (
      <div
        className="fixed inset-0 z-[9999] bg-black/60 dark:bg-black/60 flex items-center justify-center"
        
      >
        <div
          className="bg-white dark:bg-[#1E1E1E] dark:border-[1px] dark:border-[#FFFFFF]/50 w-[327px] min-h-[268px] md:w-[450px] md:min-h-[300px] lg:w-[738px] lg:min-h-[372px] rounded-[24px] p-4 lg:p-6 cursor-default"
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="w-full flex justify-end">
            <div onClick={clearmodal} className="cursor-pointer">
              <Image
                src={isDark ? closemodalwhite : closemodalblack}
                alt="close"
                className="w-[13px] h-[12px]"
              />
            </div>
          </div>

          {/* content */}
          {isnamedeck && (
            <div className="mt-4 lg:mt-2">
              <h1 className="text-center text-[#001F22] dark:text-[#0BB9CD] font-[600] text-[16px] lg:text-[24px]">Name your Deck</h1>
              <p className='text-center text-[#303030] dark:text-[#FFFFFF] font-[500] text-[12px] lg:text-[20px] mt-2'>Give your deck a name to keep things organized</p>
              <div className=' flex place-content-center mt-12 md:mt-14 lg:mt-14'>
                <input type="text" value={deckName} onChange={(e) => setdeckName(e.target.value)} className="border-[1px] border-[#CCCCCC]/80  bg-[#F6F6F6] text-[#001F22] w-[279px]  h-[43px] md:w-[316px] lg:w-[521px] lg:h-[53px] rounded-[8px]" />
              </div>
              
              <div className='w-full flex place-content-center mt-6 md:mt-9'>
                <div className='w-[279px] md:w-[316px] lg:w-[521px]  flex place-content-end'>
                  {deckName ? 
                    <div onClick={nextDeck} className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                    <Button text={"Next"} bg={"activeblue"} /> 
                    </div> : <div  className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px] '>  
                      <Button text={"Next"} bg={"blue"} /> 
                    </div> 
                  }

                </div>
              </div>

            </div>
          )}
          

          {/* Step 2 */}
          {isgenflashcard && (
            <div>
              <h1 className='text-[#001F22] dark:text-[#0BB9CD] font-[600] text-[16px] lg:text-[24px] text-center'>Generate your Flashcards</h1>
              <p className='text-[#303030] dark:text-[#FFFFFF] text-[12px] lg:text-[20px] font-[500] text-center mt-2'>How would you like to generate your flashcards?</p>
              <div className='w-full flex place-content-center mt-8'>
                  <div className='w-full  lg:w-[540px]'>
                      <h4 className='text-[#303030] dark:text-[#FFFFFF] text-[8px] lg:text-[12px] font-[500] text-center'>Select your method:</h4>
                      <div className='w-full  flex place-content-center'>
                          <div className='w-full flex justify-between gap-8 my-6 '>
                              <div onClick={ () => { setpageoption("upload") }} className={`${pageoption === "upload" ? "bg-[#cccccc] dark:bg-[#cccccc]/30"  : "bg-[#F6F6F6]" }  dark:bg-[#000000] border-[1px] border-[#CCCCCC]/80 w-full py-6 md:py-8  cursor-pointer rounded-[8px]`}>
                                  <div className='w-full flex place-content-center'>
                                      <div className='bg-[#F0FEFF] rounded-[4px] w-fit p-[8px] '>
                                          <Image src={flashuploadblack} alt='upload' className='  w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] '/>
                                      </div>
                                  </div>
                                  <p className='text-[#001F22] dark:text-[#FFFFFF] font-[500] text-[8px] lg:text-[12px] mt-3 text-center'>Upload file</p>
                              </div>

                              <div onClick={ () => { setpageoption("paste") }} className={`${pageoption === "paste" ? "bg-[#cccccc] dark:bg-[#cccccc]/30" : "bg-[#F6F6F6]" } dark:bg-[#000000] border-[1px] border-[#CCCCCC]/80 w-full py-6 md:py-8  cursor-pointer rounded-[8px]`}>
                                  <div className='w-full flex place-content-center'>
                                      <div className='bg-[#F0FEFF] rounded-[4px] w-fit p-[8px] '>
                                          <Image src={flashpasteblack} alt='upload' className='  w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] '/>
                                      </div>
                                  </div>
                                  <p className='text-[#001F22] dark:text-[#FFFFFF] font-[500] text-[8px] lg:text-[12px] mt-3 text-center'>Paste text</p>
                              </div>
                          </div>
                      </div>
                      
                      
                  </div>
              </div>
            

              <div className='w-full flex place-content-center mt-4 mb-6'>
                  <div className='w-full lg:w-[540px] flex justify-between'>
                      <div onClick={backtoDeck} className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                          <Button text={"Back"} bg={"graybtn"} />
                      </div>
                      {pageoption === "" ? <div  className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                          <Button text={"Next"} bg={"blue"} />
                      </div>  : <div onClick={() => nextFlashcard(pageoption)} className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                          <Button text={"Next"} bg={"activeblue"} />
                      </div> }
                      
                  </div>
              </div>
            </div>
          )}
          

          {/* step 3 */}
          {/* for upload */}

          {isuploadpage && (
            <div >
              {uploadfile && (
                <div >
                  <h1 className='text-[#001F22] dark:text-[#0BB9CD] font-[600] text-[16px] lg:text-[24px] text-center'>Please upload your file</h1>
                  <p className='text-[#303030] dark:text-[#FFFFFF] text-[12px] lg:text-[20px] font-[500] text-center mt-2'>Turn any file into something you can study</p>

                  {/* start */}
                  <div className='w-full flex place-content-center'>
                    <div
                      className='border-[1px] border-[#303030] border-dashed dark:border-[#FFFFFF] dark:bg-[#000000] rounded-[8px] w-[279px] h-[117px] lg:w-[368px] lg:h-[164px] mt-6 flex justify-center items-center cursor-pointer'
                      onClick={() => document.getElementById("fileInput")?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const file = e.dataTransfer.files?.[0]
                        if (file) handleFileUpload(file)
                      }}
                    >
                      {!selectedFile ? (
                        <div className='text-center'>
                          <div className='bg-[#F0FEFF] rounded-[4px] w-fit p-[8px] mx-auto'>
                            <Image src={flashuploadblack} alt='upload' className='w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]' />
                          </div>
                          <p className='text-[#001F22] dark:text-[#FFFFFF] font-[500] text-[8px] lg:text-[12px] mt-2'>
                            Upload file
                          </p>
                        </div>
                      ) : (
                        <div className="w-full px-4 text-center">
                          <div className='flex  w-full place-content-center '>
                            <div className='flex gap-[9px] dark:bg-[#F0FEFF] w-fit px-[16px] py-[6px] rounded-[4px]'>
                              <Image src={flashuploadblack} alt='upload' className='w-[12px] h-[12px] lg:w-[16px] lg:h-[16px]' />
                              <p className="text-[#6B7280]  font-[400] text-[8px] lg:text-[10px]">
                                {selectedFile.name}
                              </p>
                            </div>
                          </div>

                          {/* Only show progress bar if still uploading */}
                          {uploadProgress < 100 && (
                            <>
                              <div className="w-full flex place-content-center mt-2 lg:mt-4">
                                <div className="w-[211px] h-[2.96px] lg:w-[285px] lg:h-[4px] bg-[#D9D9D9] rounded-[32px]  overflow-hidden">
                                  <div
                                    className="h-full bg-[#FF8901] transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                              </div>
                              
                              <p className="text-[#6B7280] dark:text-[#FFFFFF] font-[400] text-[8px] lg:text-[12px] mt-1">
                                Uploading {uploadProgress}%
                              </p>
                            </>
                          )}

                          {/* Upload complete message */}
                          {uploadProgress === 100 && (
                            <p
                              onClick={resetUpload}
                              className="mt-2 text-[#0BB9CD] font-[600] cursor-pointer text-[8px] lg:text-[12px]"
                            >
                              <span className='hover:underline'>Click here to replace</span> <span className='font-[400] text-[#6B7280] dark:text-[#FFFFFF] cursor-default '>or drag and drop file</span>
                            </p>
                          )}
                        </div>
                      )}

                      <input
                        id="fileInput"
                        type="file"
                        accept=".txt,.doc,.docx,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

                          if (file.size > maxSizeInBytes) {
                            toast.error('File size must be less than 2MB');
                            e.target.value = ''; 
                            return;
                          }

                          handleFileUpload(file);
                        }}
                      />

                    </div>
                  </div>


                  {/* btns */}
                  <div className='w-full flex place-content-center mt-8 lg:mt-12 mb-6 px-2 md:px-8 lg:px-0'>
                      <div className='w-full lg:w-[540px] flex justify-between'>
                          <div onClick={uploadtoflash}  className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                              <Button text={"Back"} bg={"graybtn"} />
                          </div>
                          {/* {selectedFile ? <div onClick={() => uploaddone()} className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                              <Button text={"Generate"} bg={"activeblue"} />
                          </div> : <div  className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                              <Button text={"Generate"} bg={"blue"} />
                          </div> } */}
                          <div
                            onClick={() => {
                              if (selectedFile) uploaddone();
                            }}
                            className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]' >
                            <Button text={"Generate"} bg={selectedFile ? "activeblue" : "blue"} />
                          </div>
                      </div>
                  </div>
                </div>
              )}
              

              {/* uploading */}
              {/* {afterfileupload && (
                <div>
                  <p>done with all upload</p>
                  
                </div>
              )} */}
            </div>
          )}
          

          {/* for paste */}
          {ispastepage && (
            <div>
              <div>
                <h1 className='text-[#001F22] dark:text-[#0BB9CD] font-[600] text-[16px] lg:text-[24px] text-center'>Paste your text</h1>
                <p className='text-[#6B7280] dark:text-[#FFFFFF] text-[12px] lg:text-[20px] font-[500] text-center mt-2'>Turn any file into something you can study</p>

                {/* text area */}
                <div className='w-full flex place-content-center my-8'>
                  <div className='w-[279px]  lg:w-[532px]  '>
                    <textarea value={studytext} onChange={textField} maxLength={100000} placeholder='Paste text here...' 
                    className=' h-[162px] lg:h-[256px] w-full border-[1px] border-dashed border-[#001F22] dark:border-[#FFFFFF]/50 dark:bg-[#000000] dark:text-[#ffffff]/90 dark:placeholder:text-[#ffffff]/90  bg-[#ffffff] rounded-[8px] p-4 text-[#858585] text-[8px] lg:text-[16px] font-[400] placeholder:text-[#858585] placeholder:text-[8px] placeholder:lg:text-[16px] placeholder:font-[400] '></textarea>
                    <div className='w-full flex place-content-end'>
                      <p className='text-[#858585] dark:text-[#ffffff]/70 font-[400] text-[8px] lg:text-[12px] mt-1'>{studytext.length}/100000</p>
                    </div>
                    
                  </div>
                </div>


                <div className='w-full flex place-content-center mt-4 mb-6 px-2 md:px-8 lg:px-0'>
                  <div className='w-full lg:w-[540px] flex justify-between'>
                      <div onClick={ () => backtopaste()} className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                          <Button text={"Back"} bg={"graybtn"} />
                      </div>
                      { studytext.length > 0 ? <div onClick={ () => afterTextPaste()} className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                          <Button text={"Generate"} bg={"activeblue"} />
                      </div> : <div  className='w-[94px] h-[30px]  lg:w-[139px] lg:h-[44px]'>
                          <Button text={"Generate"} bg={"blue"} />
                      </div> }
                      
                  </div>
              </div>
              </div>
            </div>
          )}
          
          {/* end 3 */}
        </div>
      </div>
    )}
    
    
    </>
    
  );
}
