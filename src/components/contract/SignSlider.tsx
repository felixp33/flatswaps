"use client";

import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";

interface SignSliderProps {
  signed: boolean;
  onSign: () => void;
}

const SignSlider: React.FC<SignSliderProps> = ({ signed, onSign }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (signed) {
      setValue(100);
    }
  }, [signed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (signed) return;
    setValue(Number(e.target.value));
  };

  const handleEnd = () => {
    if (signed) return;
    if (value >= 95) {
      setValue(100);
      onSign();
    } else {
      setValue(0);
    }
  };

  return (
    <div className="relative w-64 mx-auto select-none">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        className={`w-full h-12 rounded-full slider transition-all duration-300 ${
          signed || value > 0 ? "bg-green-600" : "bg-gray-200"
        }`}
        disabled={signed}
      />
      <span className={`absolute inset-0 flex items-center justify-center pointer-events-none font-medium ${signed ? "text-white" : "text-gray-700"}`}>
        {signed ? "Signed" : "Slide to Sign"}
      </span>
    </div>
  );
};

export default SignSlider;
