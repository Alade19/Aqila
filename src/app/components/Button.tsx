"use client";
import React from "react";
import styled from "styled-components";

type ButtonProps = {
  //   onClick: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
  bg: "graybtn" | "blue" | "activeblue" ;
};

const ButtonStyled = styled.button<{ bg: string }>(({ bg }) => ({
    background: bg === "graybtn" ? "#CCCCCC" : bg === "blue" ? "rgba(11, 185, 205, 0.3)" : bg === "activeblue" ? "rgba(11, 185, 205, 1)" : '' , 
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    transition: "background-color 0.3s ease",
    

    "&:hover": {
        background: bg === "graybtn" ? "rgba(204, 204, 204, 0.8)" : bg === "blue" ? "rgba(11, 185, 205, 0.3)" : bg === "activeblue" ? "rgba(11, 185, 205, 0.8)" : '' , 
    },

    "&:focus": {
        outline: "none",
    },
}));
  

const ButtonText = styled.p<{ textcolor?: string }>`
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px ; 
  }
`;

export default function Button({
  //   onClick,
  text,
  type = "button",
  bg,
}: ButtonProps) {
  return (
    <ButtonStyled
      //   onClick={onClick}
      type={type} 
      bg={bg}>
      <ButtonText>{text}</ButtonText>
    </ButtonStyled>
  );
}
