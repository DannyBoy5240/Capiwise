import { FC } from "react";

import { useEffect } from "react";

interface GradientSliderProps {
  progress: number;
  progressIdx: number;
  code: string;
  mode: number;
}

const GradientSlider: FC<GradientSliderProps> = ({
  progress,
  progressIdx,
  code,
  mode,
}) => {
  return (
    <div className={"relative my-6 " + (mode == 3 ? "h-[72px]" : "h-[32px]")}>
      {mode == 1 ? (
        <div className="apporoval-progress1" />
      ) : mode == 2 ? (
        <div className="apporoval-progress2" />
      ) : (
        <div className="apporoval-progress3" />
      )}
      {mode == 1 || mode == 2 ? (
        <div className="flex absolute inset-0 w-full h-full">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              className="grow border-r border-r-[#4B4D4C88] z-[2] last:border-r-0"
              key={idx}
            ></div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <div
        className="vertical-line"
        style={{
          left: progressIdx + "%",
          borderRight: "3px solid #20A5F1",
        }}
      >
        <div className="absolute top-[-16px] w-[200px] text-[#20A5F1] text-[10px]">
          Index
        </div>
      </div>
      <div
        className="vertical-line"
        style={{
          left: progress + "%",
          height: 40,
          top: -8,
        }}
      >
        <div className="absolute top-[-18px] left-[-6px] w-[200px] text-white text-[10px]">
          {code}
        </div>
      </div>
      {mode == 1 || mode == 2 ? (
        <div className="flex justify-between text-xs text-[#979797] pt-1">
          <div>Low</div>
          <div>Average</div>
          <div>High</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GradientSlider;
