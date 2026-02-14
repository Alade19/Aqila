import apiClient from "../axios/config";
import { setUserData, setUserToken } from "../storage/cookie";
import {
  SignInType,
  SignupPayloadToSend,
  UpdatePasswordPayloadToSend,
  UpdateProfilePayloadToSend,
} from "../../types/global";
import { ResetPasswordPropType } from "@/app/(auth)/reset-password/page";

// const userData = getUserData();

export const signUpAction = async (data: SignupPayloadToSend) => {
  try {
    const response = await apiClient.post("users/", data);
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const signInAction = async (data: SignInType) => {
  try {
    const response = await apiClient.post("auth/login", data);
    const { token, user } = response?.data.data;
    setUserData(user);
    setUserToken(token);
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const forgotPasswordAction = async (data: { email: string }) => {
  try {
    const response = await apiClient.post("auth/forget-password", data);
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const resetPasswordAction = async (data: ResetPasswordPropType) => {
  try {
    const response = await apiClient.post("auth/reset-password", data);
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateUserProfileAction = async (
  data: UpdateProfilePayloadToSend
) => {
  try {
    const response = await apiClient.put("users/", data);
    const { user } = response?.data?.data;
    setUserData(user);
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateUserPasswordAction = async (
  data: UpdatePasswordPayloadToSend
) => {
  try {
    const response = await apiClient.put("users/update-password", data);
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteUserAccountAction = async () => {
  try {
    const response = await apiClient.delete("users/");
    return response?.data;
  } catch (error: unknown) {
    throw error;
  }
};
