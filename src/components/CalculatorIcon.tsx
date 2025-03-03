
import React from 'react';

const CalculatorIcon = ({ size = 128 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="16"
        y="16"
        width="96"
        height="96"
        rx="24"
        fill="url(#paint0_linear)"
        stroke="white"
        strokeWidth="2"
      />
      <rect x="32" y="32" width="64" height="16" rx="6" fill="#F5F5F7" />
      <circle cx="44" cy="68" r="8" fill="#E5E5EA" />
      <circle cx="44" cy="92" r="8" fill="#E5E5EA" />
      <circle cx="64" cy="68" r="8" fill="#E5E5EA" />
      <circle cx="64" cy="92" r="8" fill="#E5E5EA" />
      <circle cx="84" cy="68" r="8" fill="#FF9F0A" />
      <circle cx="84" cy="92" r="8" fill="#30D158" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="16"
          y1="16"
          x2="112"
          y2="112"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C2C2E" />
          <stop offset="1" stopColor="#1C1C1E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CalculatorIcon;
