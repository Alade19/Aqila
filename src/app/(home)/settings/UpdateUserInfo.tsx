"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/app/core/lib/schema";
import { SettingsSchemaType } from "@/app/core/types/global";
import { toast } from "sonner";
import { updateUserProfileAction } from "@/app/core/services/actions/authActions";
import Loader from "@/app/components/Loader";
import GradientButton from "@/app/components/GradientButton";
import { getUserData } from "@/app/core/services/storage/cookie";
export default function UpdateUserInfo() {
  const userData = getUserData();
  // console.log(userData, "UpdateUserInfo");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      firstName: userData?.first_name,
      lastName: userData?.last_name,
      email: userData?.email,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onProfileFormSubmit = async (data: SettingsSchemaType) => {
    const signUpDataToSend = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    };
    try {
      setIsLoading(true);
      const response = await updateUserProfileAction(signUpDataToSend);
      if (response.status_code === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(
          response.message || "Update profile failed, please try again"
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading && <Loader />}
      <form
        className="white-container-gray"
        onSubmit={handleSubmit(onProfileFormSubmit)}>
        <p className="font-semibold text-base mb-[1rem]">
          Personal Information
        </p>

        <div className="flex items-center gap-x-[2rem]">
          <div className="w-1/2 h-[4rem] md:h-[5rem]">
            <label className="font-semibold text-xs  mb-2">First name</label>
            <input
              type="text"
              {...register("firstName")}
              className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[45px] w-full"
            />
            {errors.firstName && (
              <p className="text-[10px] text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="w-1/2 h-[4rem] md:h-[5rem]">
            <label className="font-semibold text-xs  mb-2">Last name</label>
            <input
              type="text"
              {...register("lastName")}
              className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[45px] w-full"
            />
            {errors.lastName && (
              <p className="text-[10px] text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full h-[4rem] md:h-[5rem] mt-[1rem] mb-[1.5rem]">
          <label className="font-semibold text-xs mb-2">Email</label>
          <input
            disabled
            type="text"
            {...register("email")}
            className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[45px] w-full"
          />
          {errors.email && (
            <p className="text-[10px] text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="ml-auto w-[8.7rem] h-[44px]">
          <GradientButton text=" Save change" type="submit" />
        </div>
      </form>
    </div>
  );
}
