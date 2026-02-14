"use client";
import React, { useState } from "react";
import Loader from "@/app/components/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updatePasswordSchema } from "@/app/core/lib/schema";
import { UpdatePasswordType } from "@/app/core/types/global";
import { toast } from "sonner";
import { updateUserPasswordAction } from "@/app/core/services/actions/authActions";
import GradientButton from "@/app/components/GradientButton";
export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordType>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const onUpdatePasswordFormSubmit = async (data: UpdatePasswordType) => {
    console.log(data);
    setIsLoading(true);
    const dataToSend: UpdatePasswordType = {
      password: data.newPassword,
    };
    try {
      setIsLoading(true);
      const response = await updateUserPasswordAction(dataToSend);
      if (response.status_code === 200) {
        reset();
        toast.success("Password updated successfully");
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
      <form
        className="white-container-gray"
        onSubmit={handleSubmit(onUpdatePasswordFormSubmit)}>
        <p className="font-semibold text-base">Security Settings</p>
        <p className="text-base text-[#303030] dark:text-[#CDCDCD] my-[1rem]">
          You can set / change your password from here!
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center mb-[1rem]">
          <div className="w-full md:w-[48%] h-[4rem] md:h-[5rem]">
            <p className="font-semibold text-xs mb-2">Enter current password</p>
            <input
              type="text"
              {...register("currPassword")}
              className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[45px] w-full"
            />
            {errors.currPassword && (
              <p className="text-[10px] text-red-600">
                {errors.currPassword.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[48%] mt-[1rem] md:mt-0 h-[4rem] md:h-[5rem]">
            <p className="font-semibold text-xs mb-2">Confirm new password</p>
            <input
              type="text"
              {...register("newPassword")}
              className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[45px] w-full"
            />
            {errors.newPassword && (
              <p className="text-[10px] text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>
        <div className="ml-auto w-[8.7rem] h-[44px]">
          <GradientButton text=" Submit" type="submit" />
        </div>
      </form>
    </div>
  );
}
