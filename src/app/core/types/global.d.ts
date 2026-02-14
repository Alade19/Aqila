import { StaticImageData } from "next/image";
import {
  forgotPasswordSchema,
  signinSchema,
  signupSchema,
  resettPasswordSchema,
  settingsSchema,
  updatePasswordSchema,
} from "../lib/schema";

//gets the schemetype straight from the schema instaead of declaring the type for form validation
export type SignInType = z.infer<typeof signinSchema>;
export type SignUpType = z.infer<typeof signupSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resettPasswordSchema>;
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;

// OMIT CIRFIRM PASSORD AND TERMS AS THEY ARE NOT NEEDED BY THE SERVER
export type SignupPayloadToSend = Omit<SignUpType, "confirmPassword" | "terms">;
export type UpdateProfilePayloadToSend = Omit<
  SignUpType,
  "password" | "confirmPassword" | "terms"
>;
export type UpdatePasswordPayloadToSend = pick<UpdatePasswordType, "password">;

export type SettingsSchemaType = z.infer<typeof settingsSchema>;

// type SignupPayload = Pick<
//   SignUpType,
//   "firstName" | "lastName" | "email" | "password"
// >;

export type AuthFormType = SignInType | SignUpType;

//DASHBOARD
export interface SideBarPropsType {
  label: string;
  darkicon: StaticImageData;
  lighticon: StaticImageData;
  link: string;
}
