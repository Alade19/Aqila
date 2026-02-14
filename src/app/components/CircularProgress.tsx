"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

//THIS IS FOR TEST PROGRESS
export default function CircularProgress({ value }: { value: number }) {
  return (
    <div className="h-[3rem] w-[3rem]">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        strokeWidth={12}
        styles={{
          path: {
            stroke: "#0BB9CD",
          },
          background: {
            fill: "#CCCCCC",
          },
          text: {
            fill: "#303030",
            fontSize: "1.2rem",
          },
          trail: {
            stroke: "#f7f1fc",
            transition: "stroke-dashoffset 0.5s ease 0s",
            transform: "rotate(0.5turn)",
            transformOrigin: "center center",
          },
        }}
      />
    </div>
  );
}
