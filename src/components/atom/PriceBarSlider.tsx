import { FC } from "react";

import { useEffect } from "react";

interface PriceBarSliderProps {
  progress: number;
}

const PriceBarSlider: FC<PriceBarSliderProps> = ({ progress }) => {
  return (
    <div className="relative h-[25px] mt-2">
      <div className="flex h-[6px] rounded-full">
        <div className="bg-[#979797]" style={{ width: progress + "%" }}></div>
        <div
          className="bg-[#E1E2E4]"
          style={{
            backgroundPosition: progress + "%",
            width: 100 - progress + "%",
          }}
        ></div>
      </div>
      <div
        className="absolute z-5 top-0 bottom-0 border-r-2 border-white w-0 h-[6px] animate-hideLineHFull"
        style={{
          left: progress + "%",
        }}
      >
        <div className="absolute top-[5px] left-[-5px] w-[200px]">
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#979797" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PriceBarSlider;
