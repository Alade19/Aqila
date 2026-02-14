"use client";
import React from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";
import { IoClose } from "react-icons/io5"; // X icon

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  bordercolor: "red" | "green";
  textcolor: "red" | "green";
  icon: "check" | "cancel";
};

const COLOR_MAP = {
  red: "#FE7070",
  green: "#00840B",
};

const ButtonStyled = styled.button<{
  bordercolor?: "red" | "green";
}>(({ bordercolor }) => ({
  backgroundColor: "#ffffff",
  "@media (prefers-color-scheme: dark)": {
    backgroundColor: "#FFF5F5",
  },
  border: `1px solid ${bordercolor ? COLOR_MAP[bordercolor] : "transparent"}`,
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "8px 12px",
  transition: "all 0.3s ease",

   
  gap: "7px",

  
  "@media (min-width: 1024px)": {
    gap: "21px",
  },

  "&:hover": {
    opacity: 0.9,
  },

  "&:focus": {
    outline: "none",
  },
}));

const ButtonText = styled.p<{ textcolor?: "red" | "green" }>`
  color: ${({ textcolor }) => (textcolor ? COLOR_MAP[textcolor] : "#000")};
  font-weight: 400;
  font-size: 12px;
`;

export default function Button({
  text,
  type = "button",
  bordercolor,
  textcolor,
  icon,
}: ButtonProps) {
  const renderIcon = () => {
    const color = textcolor ? COLOR_MAP[textcolor] : "#000";
    if (icon === "check") return <MdCheck color={color} size={12} />;
    if (icon === "cancel") return <IoClose color={color} size={12} />;
    return null;
  };

  return (
    <ButtonStyled type={type} bordercolor={bordercolor}>
      {renderIcon()}
      <ButtonText textcolor={textcolor}>{text}</ButtonText>
    </ButtonStyled>
  );
}
