import { FC } from "react";

import calendarIcon from "../../../assets/calendar_ico.svg";
import calendarGrayIcon from "../../../assets/calendar_gray_ico.svg";

const FundamentalEvents = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Fundamental Events
      </div>
      {/* Upcoming Events */}
      <div>
        <div className="text-sm font-bold py-3 border-b border-b-white">
          Upcoming Events
        </div>
        <div className="flex py-3 items-center border-b border-b-[#252A2D]">
          <div className="relative">
            <img src={calendarIcon} className="max-w-none" />
            <div className="absolute top-[3px] left-[10px] text-[8px] text-black font-semibold">
              APR
            </div>
            <div className="absolute top-[16px] left-[12px] text-xs text-[#2EBD85] font-semibold">
              28
            </div>
          </div>
          <div className="pl-3 text-xs">
            AAPL to announce Q2 earnings (Confirmed)
          </div>
        </div>
      </div>
      {/* Past Events */}
      <div>
        <div className="text-sm font-bold py-3 border-b border-b-white">
          Past Events
        </div>
        <div className="flex py-3 border-b border-b-[#252A2D]">
          <div className="relative">
            <img src={calendarGrayIcon} className="max-w-none" />
            <div className="absolute top-[3px] left-[10px] text-[8px] text-[#040B11] font-semibold">
              APR
            </div>
            <div className="absolute top-[16px] left-[14px] text-xs text-[#979797] font-semibold">
              5
            </div>
          </div>
          <div className="pl-3 text-xs">
            AAPL ex-Dividend for $0.21 on 02/05/2023
            <ul className="pt-2">
              <li>Announce Date: 01/27/2023</li>
              <li>Record Date: 02/08/2023</li>
              <li>Pay Date: 02/11/2023</li>
            </ul>
          </div>
        </div>
        <div className="flex py-3 border-b border-b-[#252A2D]">
          <div className="relative">
            <img src={calendarGrayIcon} className="max-w-none" />
            <div className="absolute top-[3px] left-[10px] text-[8px] text-[#040B11] font-semibold">
              JAN
            </div>
            <div className="absolute top-[16px] left-[12px] text-xs text-[#979797] font-semibold">
              27
            </div>
          </div>
          <div className="pl-3 text-xs">AAPL announced Q1 earnings.</div>
        </div>
      </div>
    </div>
  );
};

export default FundamentalEvents;
