"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { google } from "../../core/lib/utils";
import Link from "next/link";
import {
  DASHBOARD,
  FORGOTPASSWORD,
  SIGNIN,
  SIGNUP,
} from "../../core/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, signupSchema } from "../../core/lib/schema";
import { AuthFormType, SignupPayloadToSend } from "../../core/types/global";
import { useForm } from "react-hook-form";
import { openpassword, closepassword } from "../../core/lib/utils";
import {
  signInAction,
  signUpAction,
} from "../../core/services/actions/authActions";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";
import {
  getAlDeckActions,
  getProgressActions,
  getDeckInprogressActions,
} from "@/app/core/services/actions/userActions";

type AuthFormProps = {
  mode: "signin" | "signup";
};

function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(mode === "signup" ? signupSchema : signinSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onAuthFormSubmit = async (data: AuthFormType) => {
    const signUpDataToSend: SignupPayloadToSend = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    };
    const signInDataToSend = {
      email: data.email,
      password: data.password,
    };
    try {
      setIsLoading(true);
      let response;
      if (mode === "signup") {
        response = await signUpAction(signUpDataToSend);
        if (response.status_code === 201) {
          toast.success("Signup successful");
          router.push(SIGNIN);
        } else {
          toast.error(response.message || "Signup failed, please try again");
        }
      } else if (mode === "signin") {
        response = await signInAction(signInDataToSend);
        if (response.status_code === 200) {
          toast.success("Login successful");
          getProgressActions();
          getAlDeckActions();
          getDeckInprogressActions();
          router.push(DASHBOARD);
        } else {
          toast.error(response.message || "Login failed, please try again");
        }
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
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onAuthFormSubmit)}>
        <button className="flex justify-center items-center border-1 border-[#CCCCCC] rounded-3xl h-[38px] md:h-[55px] w-full">
          <Image src={google} alt="google button" className="w-3.5" />
          <span className="text-[#303030] font-semibold text-xs ml-2 cursor-pointer">
            Sign up with google
          </span>
        </button>
        <div className="w-full flex justify-center items-center my-3 md:my-[1.2rem]">
          <span className="bg-[#CCCCCC] w-[50%] h-[1px]"></span>
          <span className="text-[#303030] mx-[3rem] text-xs">or</span>
          <span className="bg-[#CCCCCC] w-[50%] h-[1px]"></span>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          {mode === "signup" && (
            <div className="flex justify-between items-center ">
              <div className="w-[48.5%] md:w-[47%] h-[4rem] md:h-[5rem]">
                <label className="font-semibold text-xs text-[#303030] mb-2">
                  First name
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
                />
                {errors.firstName && (
                  <p className="text-[10px] text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-[48.5%] md:w-[47%] h-[4rem] md:h-[5rem] ">
                <label className="font-semibold text-xs text-[#303030] mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
                />
                {errors.lastName && (
                  <p className="text-[10px] text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="w-full h-[4rem] md:h-[5rem]">
            <label className="font-semibold text-xs text-[#303030] mb-2">
              Email Address
            </label>
            <input
              type="text"
              {...register("email")}
              className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
            />
            {errors.email && (
              <p className="text-[10px] text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div
              className={`${
                mode === "signup" ? "w-[48.5%] md:w-[47%]" : "w-full"
              } h-[4rem] md:h-[5rem]`}>
              <div className="flex justify-between items-center">
                <label className="font-semibold text-xs text-[#303030] mb-2">
                  Password
                </label>
                <Link href={FORGOTPASSWORD} className="text-[#0BB9CD] font-[600] text-[12px]">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={isPasswordVisible ? "text" : "password"}
                  className="border-[0.5px] border-[#CCCCCC] rounded-lg h-[38px] md:h-[50px] w-full"
                />
                <Image
                  src={isPasswordVisible ? openpassword : closepassword}
                  alt="password-visiblity button"
                  className="w-3.5 absolute right-4 top-3.5 md:top-5 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            {mode === "signup" && (
              <div className="w-[48.5%] md:w-[47%] h-[4rem] md:h-[5rem]">
                <label className="font-semibold text-xs text-[#303030] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={isPasswordVisible ? "text" : "password"}
                    className="border-[0.5px] border-[#CCCCCC] text-[#303030] rounded-lg h-[38px] md:h-[50px] w-full"
                  />
                  <Image
                    src={isPasswordVisible ? openpassword : closepassword}
                    alt="password-visiblity button"
                    className="w-3.5 absolute right-4 top-5 cursor-pointer"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {mode === "signup" && (
            <div className=" mt-2">
              <div className="flex items-stretch w-full">
                <input
                  type="checkbox"
                  className="dark:bg-white cursor-pointer"
                  checked={isTermChecked}
                  {...register("terms", {
                    onChange: (e) => setIsTermChecked(e.target.checked),
                  })}
                />
                <span className="font-medium text-xs ml-2 text-black">
                  I agree to
                  <span className="text-[#0BB9CD] font-bold mx-1 cursor-pointer ">
                    terms and conditions
                  </span>
                  and
                  <span className="text-[#0BB9CD] font-bold ml-1 cursor-pointer ">
                    privacy policy
                  </span>
                </span>
              </div>
              {errors.terms && (
                <p className="text-red-600 text-[10px]">
                  {errors.terms.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="bg-brand-gradient mt-[1rem] mb-[0.5rem] w-full h-[39px] md:h-[55px] rounded-lg text-white text-[12px] cursor-pointer">
            {mode === "signup" ? "Create account" : "Log in"}
          </button>
        </div>

        <div className="text-center text-xs">
          {mode === "signup" ? (
            <>
              {/* Already have an account?{" "} */}
              <Link href={SIGNIN} className="text-[#0BB9CD] font-bold">
                Sign in
              </Link>
            </>
          ) : (
            <div className="flex justify-center w-full items-center">
              <span>

                {" "}
                {/* Don't have an account?{" "} */}
                <Link href={SIGNUP} className="text-[#0BB9CD] font-bold">
                  Sign up
                </Link>
              </span>
              
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default AuthForm;
