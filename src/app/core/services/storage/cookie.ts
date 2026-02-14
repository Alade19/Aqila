"use client";
import Cookies from "js-cookie";
import { SettingsSchemaType } from "../../types/global";

const isWindowDefined = typeof window !== "undefined";

export const setUserToken = (token: string) => {
  if (isWindowDefined) {
    Cookies.set("userToken", token);
  }
};

export const setUserData = (userData: SettingsSchemaType) => {
  if (isWindowDefined) {
    Cookies.set("userData", JSON.stringify(userData));
  }
};

export const removeUserData = () => {
  if (isWindowDefined) {
    Cookies.remove("userToken");
    Cookies.remove("userData");
  }
};

export const getUserToken = () => {
  if (isWindowDefined) {
    const token = Cookies.get("userToken");
    return token ? token : null;
  }
  return null;
};

export const getUserData = () => {
  if (isWindowDefined) {
    const userData = Cookies.get("userData");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};


