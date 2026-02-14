"use client";
import React from "react";
import LandingNavBar from "./components/LandingNavBar";
import LandingAutoFlascard from "./components/LandingAutoFlascard";
import LandingUseCase from "./components/LandingUseCase";
import LandingFooter from "./components/LandingFooter";
import LandingHowWorks from "./components/LandingHowWorks";
import {studylaptop, studymanimg, studyphone} from "./core/lib/utils";
import Image from 'next/image';
import useScrollReveal from "./core/lib/useScrollReveal";


export default function Home() {
  useScrollReveal();

  return (
    <div className="">
      <div className="relative min-h-[23rem] md:min-h-[41rem] lg:min-h-[57rem] xl:min-h-[80rem] ">
        <LandingNavBar />
      </div>
      <div className="z-20">
        <LandingAutoFlascard />
      </div>
      <div>
        <LandingHowWorks />
      </div>
      <div>
        <LandingUseCase />
      </div>

      {/* study anytime */}
      <div className=" bg-[#001F22] h-[360px] md:h-[500px] lg:h-[650px] xl:h-[771px] w-full relative">
        <div className="pt-[44px]">
          <h1  className="fade-up text-[#FFFFFF] text-[24px] md:text-[32px] xl:text-[60px] font-[600] text-center xl:leading-18">Study Anywhere,<br />Anytime</h1>
          <p className="fade-up text-[#FFFFFF] mt-[16px] text-[10px] md:text-[16px] xl:text-[24px] font-[400] text-center xl:leading-8">Access Aqila seamlessly on your desktop, laptop, or<br />phone. Your study tools are always within reach.</p>
        </div>
          <Image src={studymanimg} alt="" className="absolute fade-up bottom-0 left-8 lg:left-10 xl:left-40 w-[25%] xl:w-auto z-20"/>
          <Image src={studylaptop} alt="" className="absolute fade-up bottom-0 left-26  md:left-47 lg:left-64 xl:left-92 w-[30%] lg:w-[35%] xl:w-auto"/>
          <Image src={studyphone} alt="" className="absolute fade-up bottom-0 left-38 h-[33%] w-[53%] md:left-76 lg:left-113 xl:left-156 md:w-[45%] lg:w-auto md:h-[47%] lg:h-[54%] xl:h-[58%]"/>
      </div>

      <div>
        <LandingFooter />
      </div>


    </div>
  );
}

