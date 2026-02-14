"use client";
import React from "react";
import ThemeToggle from "./Theme";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getUserData } from "../core/services/storage/cookie";
import { avatar, search, bell, belllight } from "../core/lib/utils";
type NavBarPropTypes = {
  isSideBarVisible: boolean;
  getSidebarToggleState: (value: boolean) => void;
};
function NavBar({ getSidebarToggleState, isSideBarVisible }: NavBarPropTypes) {
  const { resolvedTheme } = useTheme();
  const userData = getUserData();
  console.log(getUserData());

  const handleSideBarToggle = () => {
    getSidebarToggleState(!isSideBarVisible);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex justify-between items-center lg:hidden">
        <div onClick={handleSideBarToggle} className="menubars ">
          <div
            className={`menubar ${isSideBarVisible ? "menubar1" : ""}`}></div>
          <div
            className={`menubar ${isSideBarVisible ? "menubar2" : ""}`}></div>
          <div
            className={`menubar ${isSideBarVisible ? "menubar3" : ""}`}></div>
        </div>
      </div>

      <div className="hidden lg:flex border border-[#CCCCCC] bg-[#EEEEEE] dark:bg-[#1E1E1E] rounded-[12px] h-[48px] w-[30%]">
        <Image src={search} alt="avatar" className="ml-4" />
        <input
          type="text"
          placeholder="Search decks..."
          className="w-full placeholder:text-[#858585] dark:placeholder:text-[#CDCDCD]"
        />
      </div>

      <div className="flex ">
        <ThemeToggle />
        <div  className="w-fit rounded-[4px] p-[12px] cursor-pointer bg-[white] md:bg-[#EEEEEE] dark:bg-[#1E1E1E] ml-2 md:mx-5">
          <Image
            
            src={resolvedTheme === "dark" ? belllight : bell}
            alt="bell-icon"
          />
        </div>
        <div className="hidden md:flex items-center justify-center">
          <Image src={avatar} alt="avatar-icon" />
          <span className="text-[#001F22] dark:text-white font-medium text-base ml-1 capitalize">
            {userData?.first_name ? userData.first_name : "User"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
