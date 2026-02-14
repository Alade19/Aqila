import React from "react";
import styled, { keyframes } from "styled-components";
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const Loader = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #625B71;
  border-top: 3px solid #B4B5C0;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
export default function SmallLoader() {
  return <Loader />;
}