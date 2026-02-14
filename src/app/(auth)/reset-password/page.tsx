"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { FORGOTPASSWORD, PASSWORDRESETTED } from "@/app/core/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resettPasswordSchema } from "@/app/core/lib/schema";
import { ResetPasswordType } from "@/app/core/types/global";
import { resetPasswordAction } from "@/app/core/services/actions/authActions";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";

export type ResetPasswordPropType = {
  password: string;
  token: string;
};

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resettPasswordSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSearchParams().get("token") || "";

  const onResetPasswordFormSubmit = async (data: ResetPasswordType) => {
    setIsLoading(true);
    const dataToSend: ResetPasswordPropType = {
      token,
      password: data.password,
    };
    try {
      setIsLoading(true);
     const response = await resetPasswordAction(dataToSend);
      if (response.status_code === 200) {
        toast.success("Reset link sent successfully");
        router.push(PASSWORDRESETTED);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit(onResetPasswordFormSubmit)}
        className="h-full w-full md:w-full xl:w-[60% flex flex-col md:justify-center">
        <header className="font-medium text-[1.5rem] md:text-[2rem] flex items-start w-full text-[#001F22] full-line-height">
          Reset your password
        </header>
        <p className="mt-[.5rem] mb-[2rem]">Set a new password</p>
        <div className="w-full">
          <p className="font-semibold text-xs text-[#303030] mb-2">
            Enter new password
          </p>
          <input
            type="text"
            {...register("password")}
            className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
          />
          {errors.password && (
            <p className="text-[10px] text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="w-full mt-[0.75rem]">
          <p className="font-semibold text-xs text-[#303030] mb-2">
            Confirm new password
          </p>
          <input
            type="text"
            {...register("confirmPassword")}
            className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
          />
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-brand-gradient mt-[1rem] mb-[0.5rem] w-full h-[39px] md:h-[55px] rounded-lg text-white text-[12px] cursor-pointer">
          Submit
        </button>
        <span className="flex justify-center items-center text-xs text-[#001F22]">
          Back to{" "}
          <Link href={FORGOTPASSWORD} className="text-[#0BB9CD] font-bold ml-1">
            Resend link
          </Link>
        </span>
      </form>
    </>
  );
}

export default ResetPassword;
