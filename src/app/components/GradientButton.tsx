"use client";
import React from "react";
import styled from "styled-components";

type ButtonProps = {
  //   onClick: () => void;
  text: string;
  type?: "button" | "submit" | "reset";
};

const GradientButtonStyled = styled.button`
  background: linear-gradient(180deg, #0bb9cd 0%, #001f22 100%);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(180deg, #0bb9cd 30%, #001f22 80%);
  }

  &:focus {
    outline: none;
  }
`;

const GradientButtonText = styled.p<{ textcolor?: string }>`
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 10px ;
    
  }
`;

export default function GradientButton({
  //   onClick,
  text,
  type = "button",
}: ButtonProps) {
  return (
    <GradientButtonStyled
      //   onClick={onClick}
      type={type}>
      <GradientButtonText>{text}</GradientButtonText>
    </GradientButtonStyled>
  );
}
