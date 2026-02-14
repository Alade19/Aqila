"use client";
import React from "react";
import Image from "next/image";
import {
  logoblue,
  sideBarRoutes,
  pro,
  settingslight,
  settingsdark,
  contactblack,
  contactwhite,
  feedbackblack,
  feedbackwhite,
  logoutlight,
} from "../core/lib/utils";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { PRO, SETTINGS, SIGNIN, CONTACTUS, FEEDBACK } from "../core/lib/routes";
import { removeUserData } from "../core/services/storage/cookie";
import { useModal } from "../core/contexts/ModalContext";

type SideBarPropTypes = {
  getSidebarToggleState: () => void;
 
};

function SideBar({ getSidebarToggleState }: SideBarPropTypes) {
  const { openFlashcard } = useModal();
  const pathname = usePathname();
  const router = useRouter();

  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  const handleLogOut = () => {
    removeUserData();
    router.push(SIGNIN);
  };

  const handleTabClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: string,
    label: string
  ) => {
    e.preventDefault();
  
    if (label === "Create Flashcard" && pathname !== "/flashcards") {
      
      openFlashcard();
    } else {
      router.push(item);
    }
   
    getSidebarToggleState();
  };
 

  const { resolvedTheme } = useTheme();

  return (
    <aside className="w-full pt-[1rem] ">
      <div className="cursor-pointer pt-[1.5rem] pl-[1.5rem] lg:pl-0 w-[50%] md:w-[60%] md:mx-auto">
        <Image src={logoblue} alt="logo-icon" className="w-full " />
      </div>

      <div className="flex flex-col justify-between items-stretch mt-[4rem] md:mt-[6rem] lg:mt-[4rem] gap-y-5 w-[85%] mx-auto  ">
        {sideBarRoutes.map((item) => (
          <div
            key={item.label}
            onClick={(e) => handleTabClick(e, item.link, item.label)}
            className={`flex items-center justify-left h-[3rem] cursor-pointer rounded-lg pl-4 ${
              pathname === item.link && "bg-[#DEFCFF]"
            } `}>
            <Image
              src={resolvedTheme === "dark" && pathname !== item.link ? item.darkicon : item.lighticon}
              alt="logo-icon"
              className="w-[1rem] h-[1rem]"
            />
            <span
              className={`ml-2 text-xs xl:text-base font-medium ${
                pathname === item.link ? "text-[#001F22]" : ""
              }`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto w-[85%] mt-[4rem] lg:mt-[2.5rem]">
        <Link
          href={PRO}
          className="bg-brand-gradient w-full h-[3.5rem] flex items-center justify-center rounded-lg ">
          <Image src={pro} alt="logo-icon" className="w-ful" />
          <span className="text-white ml-3 font-bold"> Go unlimited with PRO</span>
        </Link>

        <div
          onClick={(e) => handleTabClick(e, SETTINGS, "Settings")}
          className={`mt-[2rem] w-full h-[3.5rem] flex items-center justify-left rounded-lg pl-4 cursor-pointer ${
            pathname === SETTINGS && "bg-[#DEFCFF] text-[#001F22]"
          }`}>
          <Image src={isDark && pathname !== SETTINGS ? settingsdark : settingslight} alt="logo-icon" className="w-ful" />
          <span className="ml-3 font-medium"> Settings</span>
        </div>

        <div
          onClick={(e) => handleTabClick(e, CONTACTUS, "Contact Us")}
          className={`mt-4 lg:mt-2 w-full h-[3.5rem] flex items-center justify-left rounded-lg pl-4 cursor-pointer ${
            pathname === CONTACTUS && "bg-[#DEFCFF] text-[#001F22]"
          }`}>
          <Image src={isDark && pathname !== CONTACTUS ? contactwhite : contactblack} alt="logo-icon" className="w-ful" />
          <span className="ml-3 font-medium"> Contact Us</span>
        </div>
        
        <div
          onClick={(e) => handleTabClick(e, FEEDBACK, "Feedback")}
          className={`mt-4 lg:mt-2 w-full h-[3.5rem] flex items-center justify-left rounded-lg pl-4 cursor-pointer ${
            pathname === FEEDBACK && "bg-[#DEFCFF] text-[#001F22]"
          }`}>
          <Image src={isDark && pathname !== FEEDBACK ? feedbackwhite : feedbackblack} alt="logo-icon" className="w-ful" />
          <span className="ml-3 font-medium">Give feedbacks</span>
        </div>
        

        <div
          onClick={handleLogOut}
          className="mt-[0.5rem] w-full h-[3.5rem] flex items-center justify-left pl-4 cursor-pointer">
          <Image src={logoutlight} alt="logo-icon" className="w-ful" />
          <span className="ml-3 font-medium"> Log out</span>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
