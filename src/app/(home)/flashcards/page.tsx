"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { useModal } from "../../core/contexts/ModalContext";
import FlipCard from '../../components/FlipCard';
import Frontcardcontent1 from '../../components/Frontcardcontent1';
import Backcardcontent1 from '../../components/Backcardcontent1';
// import Dashboard from '../dashboard/page';
import {  useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { getDeckFlashcards } from "@/app/core/services/actions/userActions";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Loader from '../../components/Loader';




const Page = () => {
  // const { openFlashcard } = useModal();
  const router = useRouter();
  const [current, setCurrent] = useState(0); 
  const [prev, setPrev] = useState<number | null>(null); 
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const searchParams = useSearchParams();
  const deckId = searchParams.get('deckId');

  useEffect( () => {
   console.log(deckId) 
   console.log( flashcards)
  })

  const {
    data: flashcards,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["deckFlashcards", deckId],
      queryFn: () => getDeckFlashcards(Number(deckId)),
      enabled: !!deckId,
    });

    if (isLoading) return <div className=""> <Loader /> </div>;
    if (isError) {
      toast.error("Failed to load flashcards");
      toast.error(error.message);
      router.push("/dashboard");
      return ;
  }

  const goTo = (index: number, dir: "next" | "prev") => {
    if (index < 0 || index >= slides.length) return;
    setPrev(current);
    setCurrent(index);
    setDirection(dir);
  };

  const next = () => goTo(current + 1, "next");
  const previous = () => goTo(current - 1, "prev");

  const slides = sildercontents.map((text) => (
    <FlipCard
      key={text.id}
      frontContent={<Frontcardcontent1 text = {text.question} />}
      backContent={(setFlipped) => <Backcardcontent1 sildercontents={sildercontents} index={text.id} next={next} setFlipped={setFlipped} text ={text.answer} />}
    />
  ));
  
  // const slides = [
  //   <FlipCard
  //     key={0}
  //     frontContent={<Frontcardcontent1 text = "What is work-study?" />}
  //     backContent={(setFlipped) => <Backcardcontent1 index={0} next={next} setFlipped={setFlipped} text = "Work-study is a systematic and analytical study of work processes and work methods aimed at increasing efficiency and reducing costs." />}
  //   />,
  //   <FlipCard
  //     key={1}
  //     frontContent={<Frontcardcontent1 text = "How does the process of photosynthesis in plants contribute to the global carbon cycle and help mitigate the effects of climate change?" />}
  //     backContent={(setFlipped) => <Backcardcontent1 index={1} next={next} setFlipped={setFlipped} text = "Photosynthesis is the process by which green plants, algae, and some bacteria use sunlight, carbon dioxide (CO₂), and water to produce glucose and oxygen." />}
  //   />,
  //   <FlipCard
  //     key={2}
  //     frontContent={<Frontcardcontent1 text = "In what ways has the development of the internet transformed traditional models of education, and what are some challenges that come with online learning?" />}
  //     backContent={(setFlipped) => <Backcardcontent1 index={2} next={next} setFlipped={setFlipped} text = "The internet has revolutionized education by enabling remote learning, providing access to vast amounts of information The internet has revolutionized education by enabling remote learning, providing access to vast amounts of information" />}
  //   />,
  //   <FlipCard
  //     key={3}
  //     frontContent={<Frontcardcontent1 text = "Why is biodiversity important to the stability of ecosystems, and what are some of the consequences of its decline?" />}
  //     backContent={(setFlipped) => <Backcardcontent1 index={3} next={next} setFlipped={setFlipped} text = "Biodiversity contributes to the resilience and productivity of ecosystems by ensuring a wide variety of species that fulfill different ecological roles" />}
  //   />,
  //   <FlipCard
  //     key={4}
  //     frontContent={<Frontcardcontent1 text = "What are the main differences between renewable and non-renewable energy sources, and how do these differences impact environmental sustainability?" />}
  //     backContent={(setFlipped) => <Backcardcontent1 index={4} next={next} setFlipped={setFlipped} text = "Renewable energy sources—such as solar, wind, hydro, and geothermal—are derived from natural processes that are replenished constantly. In contrast, non-renewable sources like coal" />}
  //   />,

  // ];

  

  return (
    <div className="">
      {/* Top bar */}
      <div onClick={
        () => {
          router.push("/dashboard");
        }
      } className="flex gap-[10px] lg:gap-[15px] cursor-pointer w-fit">
        <FaAngleLeft className="text-[#303030] dark:text-[#ffffff] font-[600px] text-[16px] lg:text-[24px] my-auto h-fit" />
        <h1 className="text-[#303030] dark:text-[#ffffff] font-[600px] text-[16px] lg:text-[24px] my-auto h-fit">Work Study{deckId}</h1>
        
      </div>

      {/* Slider */}
      <div className="flex place-content-center mt-12 lg:mt-8">
        <div className="relative w-full h-[384px] lg:w-[782px] lg:h-[460px] overflow-hidden">
          <div className="flex place-content-center">
            <div className="relative w-full h-[337px] lg:w-[676px] lg:h-[413px] overflow-hidden">
              {/* Previous Slide (exit animation) */}
              {prev !== null && (
                <div
                  key={`prev-${prev}`}
                  className={`absolute inset-0 m-auto flex justify-center items-center 
                  w-[90%] h-[327px] lg:w-[646px] lg:h-[403px] 
                  transition-transform duration-1000 ease-in-out z-0  
                  ${
                    direction === "next"
                      ? "-translate-x-full"
                      : "translate-x-full"
                  } opacity-0`}
                >
                  {slides[prev]}
                </div>
              )}

              {/* Current Slide (enter animation) */}
              <div
                key={`current-${current}`}
                className={`absolute inset-0 m-auto flex justify-center items-center 
                w-[90%] h-[327px] lg:w-[646px] lg:h-[403px] 
                transition-transform duration-1000 ease-in-out z-10 
                ${
                  direction === "next"
                    ? "translate-x-0 animate-slide-in-right"
                    : "translate-x-0 animate-slide-in-left"
                }`}
              >
                {slides[current]}
              </div>
            </div>
          </div>

          {/* Slide counter */}
          <div className="absolute left-1/2 bottom-1">
            <p className="text-[#303030] dark:text-[#ffffff] font-[600] text-[16px] lg:text-[20px]">
              {current + 1}/{slides.length}
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-0 lg:bottom-5/9 left-0 w-full flex justify-between">
            <button
              onClick={previous}
              className={`${current === 0 ? "dark:bg-black opacity-0" : "dark:bg-[#1E1E1E] "} bg-[#ffffff]  rounded-[100px] w-[20px] h-[43px] flex justify-center items-center cursor-pointer`}
            >
              <FaAngleLeft
                className={`${current === 0 ? "hidden" : "block"} text-[#162660] font-[400] dark:text-[#ffffff] text-[12px] lg:text-[14px]`}
              />
            </button>
            <button
              onClick={next}
              className={`${current === slides.length - 1 ? "dark:bg-black opacity-0" : "dark:bg-[#1E1E1E]"} bg-[#ffffff] rounded-[100px] w-[20px] h-[43px] flex justify-center items-center cursor-pointer`}
            >
              <FaAngleRight
                className={`${
                  current === slides.length - 1 ? "hidden" : "block"
                } text-[#162660] font-[400] dark:text-[#ffffff] text-[12px] lg:text-[14px]`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;


const sildercontents: {
  id: number;
  question: string;
  answer: string;
}[] = [
  {
    "id":0,
    "question": "What is work-study?",
    "answer": "Work-study is a systematic and analytical study of work processes and work methods aimed at increasing efficiency and reducing costs."
  },
  {
    "id": 1,
    "question": "How does climate change affect global sea levels, and what are the potential consequences for coastal communities?",
    "answer": "Climate change leads to the melting of glaciers and polar ice caps, as well as the thermal expansion of seawater due to rising temperatures. These effects contribute to rising sea levels, which can result in coastal erosion, increased flooding, loss of habitat, and displacement of populations living in low-lying coastal regions."
  },
  {
    "id": 2,
    "question": "What are the primary causes of deforestation, and how does it impact the environment and biodiversity?",
    "answer": "Deforestation is primarily caused by agricultural expansion, logging, infrastructure development, and urbanization. It leads to habitat destruction, loss of biodiversity, disruption of water cycles, and increased carbon emissions, which contribute to climate change and ecological imbalance."
  },
  {
    "id": 3,
    "question": "How has the advancement of artificial intelligence influenced the job market in recent years?",
    "answer": "Artificial intelligence has transformed the job market by automating repetitive tasks, enhancing decision-making processes, and creating new job opportunities in tech and data-related fields. However, it has also displaced certain jobs, especially in manufacturing and administrative roles, raising concerns about workforce retraining and job displacement."
  },
  {
    "id": 4,
    "question": "In what ways can governments and communities work together to promote sustainable urban development?",
    "answer": "Governments and communities can collaborate through policy-making, public engagement, and investment in green infrastructure. Strategies include promoting public transportation, implementing eco-friendly building codes, increasing green spaces, and encouraging renewable energy use to build more sustainable and livable urban environments."
  },
  {
    "id": 5,
    "question": "What role do international organizations play in addressing global health crises such as pandemics?",
    "answer": "International organizations like the World Health Organization (WHO) coordinate global responses by sharing information, setting health standards, distributing medical supplies, and supporting countries with limited resources. Their role is crucial in ensuring a coordinated, effective response to pandemics and in promoting long-term public health resilience."
  }
]
