import { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  percentage: number;
  isVisible: boolean;
}

const CircularProgress = ({ percentage, isVisible }: CircularProgressProps) => {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef<SVGCircleElement | null>(null);

  // Responsive logic (SSR safe)
  const isLarge = typeof window !== "undefined" && window.innerWidth >= 1024;
  const outerSize = isLarge ? 151 : 98;
  const ringSize = isLarge ? 105.34 : 68.3;
  const dotSize = isLarge ? 10.5 : 6.8;
  const fontSize = isLarge ? "text-[20px]" : "text-[10px]";

  const strokeWidth = 2;
  const radius = (outerSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animate progress
  useEffect(() => {
    if (isVisible) {
      setProgress(percentage);
    } else {
      setProgress(0);
    }
  }, [isVisible, percentage]);

  useEffect(() => {
    const offset = circumference - (progress / 100) * circumference;
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [progress, circumference]);

  // Position for progress-end dot
  const angle = (progress / 100) * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  const dotX = outerSize / 2 + radius * Math.cos(rad);
  const dotY = outerSize / 2 + radius * Math.sin(rad);

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-white dark:bg-white"
      style={{ width: outerSize, height: outerSize }}
    >
      {/* Glow ring */}
      <div
        className="absolute rounded-full z-0 glow-ring"
        style={{
          width: ringSize,
          height: ringSize,
        }}
      ></div>

      {/* SVG progress ring */}
      <svg
        className="absolute top-0 left-0 transform -rotate-90"
        width={outerSize}
        height={outerSize}
      >
        <circle
          stroke="transparent"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={outerSize / 2}
          cy={outerSize / 2}
        />
        <circle
          ref={circleRef}
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          r={radius}
          cx={outerSize / 2}
          cy={outerSize / 2}
          className="transition-all duration-[2000ms] ease-in-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="18%" stopColor="#0BB9CD" />
            <stop offset="80%" stopColor="rgba(11, 185, 205, 0.05)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dot at end of progress */}
      <div
        className="absolute rounded-full bg-[#0BB9CD] z-10"
        style={{
          width: dotSize,
          height: dotSize,
          left: dotX - dotSize / 2,
          top: dotY - dotSize / 2,
        }}
      />

      {/* Percentage Text */}
      <div
        className={`absolute z-20 text-[#303030] dark:text-[#1C2A53] font-[500] ${fontSize}`}
      >
        {progress}%
      </div>
    </div>
  );
};

export default CircularProgress;
