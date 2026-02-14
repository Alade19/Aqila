"use client";
import Link from "next/link";
import React, { useState } from "react";
import { PASSWORDRESETLINKSENT, SIGNIN } from "@/app/core/lib/routes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/app/core/lib/schema";
import { ForgotPasswordType } from "@/app/core/types/global";
import { forgotPasswordAction } from "@/app/core/services/actions/authActions";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onForgotPasswordSubmit = async (data: ForgotPasswordType) => {
    console.log(data);
    const forgotPasswordDataToSend = {
      email: data.email,
    };

    try {
      setIsLoading(true);
      const response = await forgotPasswordAction(forgotPasswordDataToSend);
      if (response.status_code === 200) {
        toast("Reset link sent successfully");
        router.push(PASSWORDRESETLINKSENT);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong, please try again");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit(onForgotPasswordSubmit)}
        className="h-full w-full xl:w-[60% flex flex-col md:justify-center">
        <header className="font-medium text-[1.5rem] md:text-[2rem] flex items-start w-full text-[#001F22] full-line-height">
          Forgot password?
        </header>
        <p className="mt-[1rem] md:mt-[1.5rem] mb-[2rem]">
          Enter the email you used to sign up. We&apos;ll send you a link to
          reset your password.
        </p>
        <div className="w-full h-[4rem] md:h-[5rem]">
          <label className="font-semibold text-xs text-[#303030] mb-2">
            Email Address
          </label>
          <input
            type="text"
            placeholder=""
            {...register("email")}
            className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
          />
          {errors.email && (
            <p className="text-[10px] text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-brand-gradient mt-[1rem] mb-[0.5rem] w-full h-[39px] md:h-[55px] rounded-lg text-white text-[12px] cursor-pointer">
          Submit
        </button>
        <span className="flex justify-center items-center text-xs text-[#001F22]">
          Back to{" "}
          <Link href={SIGNIN} className="text-[#0BB9CD] font-bold ml-1">
            Sign in
          </Link>
        </span>
      </form>
    </>
  );
}

export default ForgotPassword;
