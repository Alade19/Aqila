"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 150;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderCircle = styled.div`
  border: 10px solid #625b71;
  border-top: 10px solid #b4b5c0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${rotate} 1s linear infinite;
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
}
