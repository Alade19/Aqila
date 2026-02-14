"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { deleteicon, warning } from "@/app/core/lib/utils";
import { deleteUserAccountAction } from "@/app/core/services/actions/authActions";
import { SIGNIN } from "@/app/core/lib/routes";

export default function DeleteAccount() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onDeleteUserAccount = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);

      const response = await deleteUserAccountAction();
      if (response.status_code === 200) {
        toast.success("Account deleted successfully");
        router.push(SIGNIN);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading && <Loader />}
      <div className="white-container-gray">
        <div className="flex items-center gap-x-2">
          <Image priority src={deleteicon} alt="deleteicon-imae" className="" />
          <span className="font-semibold text-base">Delete Account </span>
        </div>
        <div className="flex items-center gap-x-2 my-[1rem]">
          <Image priority src={warning} alt="warning-imae" />
          <span className="inline-text text-sm">
            Once you delete your account, there is no going back. This action{" "}
            <br /> is permanent and will:
          </span>
        </div>

        <div className="flex justify-between items-end">
          <ul className="px-[1.5rem]">
            <li className="inline-text text-xs list-disc mt-2">
              Delete all your saved preferences and settings
            </li>
            <li className="inline-text text-xs list-disc mt-2">
              Remove your entire chat history{" "}
            </li>
            <li className="inline-text text-xs list-disc mt-2">
              Cancel any active subscriptions
            </li>{" "}
            <li className="inline-text text-xs list-disc mt-2">
              Delete all associated data and personal information
            </li>
          </ul>
          <div onClick={onDeleteUserAccount} className="w-[8.7rem] h-[44px] ">
            <button className="bg-[#FFF5F5] dark:bg-[#FFDDDD] text-[#FE7070] dark:text-[#FF0909] text-xs font-bold w-full h-full rounded-lg cursor-pointer">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
