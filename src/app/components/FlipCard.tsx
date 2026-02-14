'use client';
import React, { useState } from 'react';

const FlipCard = ({
  frontContent,
  backContent,
}: {
  frontContent: React.ReactNode;
  backContent: (flip: (val: boolean) => void) => React.ReactNode; // now a function
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card w-full h-full">
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        {/* FRONT SIDE */}
        <div className="flip-front">
          {frontContent}
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => setFlipped(true)}
              className="absolute bottom-3 lg:bottom-6 text-[#CCCCCC] dark:text-[#CDCDCD] font-[400] text-[10px] lg:text-[16px] cursor-pointer"
            >
              Click to flip
            </button>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="flip-back">
          {backContent(setFlipped)}
          <div className="flex flex-col items-center justify-center ">
            <button
              onClick={() => setFlipped(false)}
              className="absolute hidden bottom-3 lg:bottom-6 text-[#CCCCCC] dark:text-[#CDCDCD] font-[400] text-[10px] lg:text-[16px] cursor-pointer"
            >
              Click to flip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
