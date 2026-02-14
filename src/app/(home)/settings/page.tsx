"use client";
import React from "react";
import Image from "next/image";
import { userprileav } from "@/app/core/lib/utils";
import UpdatePassword from "./UpdatePassword";
import UpdateUserInfo from "./UpdateUserInfo";
import DeleteAccount from "./DeleteAccount";

function SettingPage() {

  return (
    <main className="flex flex-col gap-y-[2rem]">
      <div className="relative bg-brand-gradient rounded-[8px] shadow-primaryBoxshadow h-[7rem] w-full mb-[2rem]">
        <div className="absolute bottom-[-25%] left-[3%]">
          <Image
            priority
            src={userprileav}
            alt="user-imae"
            className="rounded-full w-[104px] h-[104px]"
          />
        </div>
      </div>
      <UpdateUserInfo />
      <UpdatePassword />
      <DeleteAccount />
    </main>
  );
}

export default SettingPage;
