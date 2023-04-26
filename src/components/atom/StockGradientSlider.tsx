import { FC } from "react";

import { useEffect } from "react";

interface StockGradientSliderProps {
  progress: any;
}

const StockGradientSlider: FC<StockGradientSliderProps> = ({ progress }) => {
  const status = progress > 0 ? 1 : progress < 0 ? -1 : 0;
  // const boundary =
  //   (progress * status >= 100 ? 160 : 100 + progress * status) / 2;
  const boundary = status == 1 ? 40 : status == -1 ? 70 : 0;

  return (
    <div className="relative my-6 h-[72px]">
      {status == 0 ? (
        <div
          className="h-full rounded-[10px]"
          style={{
            background:
              "linear-gradient(90deg, #1ca65e 16%, #f5a623 50%, #d0021b 90.1%)",
          }}
        ></div>
      ) : status == 1 ? (
        <div
          className="h-full rounded-[10px]"
          style={{
            background:
              "linear-gradient(90deg, #1ca65e 10%, #f5a623 40%, #d0021b 70.1%)",
          }}
        ></div>
      ) : (
        <div
          className="h-full rounded-[10px]"
          style={{
            background:
              "linear-gradient(90deg, #1ca65e 32%, #f5a623 70%, #d0021b 90.1%)",
          }}
        ></div>
      )}
      <div
        className="vertical-line h-full"
        style={{
          left: boundary + "%",
        }}
      >
        <div className="absolute top-[-30px] left-[-6px] w-[200px]">
          <div className="text-xs text-[#979797] relative left-[-18px]">
            Fair Price
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
    </div>
  );
};

export default StockGradientSlider;
