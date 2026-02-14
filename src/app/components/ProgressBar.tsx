"use client";
import React from "react";
import styled from "styled-components";

type ProgressTypeProps = {
  progress: number;
  color: string;
};

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #cccccc;
  border-radius: 30px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ $progress: number; color: string }>`
  height: 100%;
  background: ${({ color }) => `${color}`};
  width: ${({ $progress }) => `${$progress}%`};
  transition: width 0.3s ease-in-out;
  border-radius: 100px;
`;

const ProgressBar = ({ progress, color }: ProgressTypeProps) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill color={color} $progress={Number(progress.toFixed(2))} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
