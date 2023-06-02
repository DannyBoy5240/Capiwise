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
        <div className="absolute top-[-2px] left-[-3px] w-[200px]">
          <div className="w-2.5 h-2.5 bg-[#979797] border border-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceBarSlider;
