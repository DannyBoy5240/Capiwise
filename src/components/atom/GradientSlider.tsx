import { FC } from "react";

import { useEffect } from "react";

interface GradientSliderProps {
  progress: number;
  mode: number;
}

const GradientSlider: FC<GradientSliderProps> = ({ progress, mode }) => {
  return (
    <div className="relative h-[30px] my-6">
      {mode == 1 ? (
        <div className="apporoval-progress1" />
      ) : (
        <div className="apporoval-progress2" />
      )}
      <div className="flex absolute inset-0 w-full h-full">
        {[0, 1, 2, 3, 4].map((idx) => (
          <div
            className="grow border-r-2 border-r-[#4B4D4C] z-[2] last:border-r-0"
            key={idx}
          ></div>
        ))}
      </div>
      <div
        className="vertical-line"
        style={{
          left: progress + "%",
        }}
      >
        <div className="absolute top-[-30px] left-[-6px] w-[200px]">
          <div className="text-xs text-[#979797] relative left-[-36px] top-[-5px]">
            {progress > 50 ? "Above" : progress == 50 ? "Same as" : "Below"}{" "}
            Average
          </div>
          <div>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12L0.0717956 -3.51391e-07L13.9282 8.59975e-07L7 12Z"
                fill="#979797"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-[#979797] pt-1">
        <div>Low</div>
        <div>Average</div>
        <div>High</div>
      </div>
    </div>
  );
};

export default GradientSlider;