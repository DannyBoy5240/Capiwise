import { FC } from "react";

import calendarIcon from "../../../assets/calendar_ico.svg";
import calendarGrayIcon from "../../../assets/calendar_gray_ico.svg";

interface FundamentalEventsProps {
  context: any;
}

const FundamentalEvents: FC<FundamentalEventsProps> = ({ context }) => {
  const updateDateFormat = (dateString: any) => {
    const dateArr = dateString.split("-");
    const formattedDate = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
    return formattedDate;
  };

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
              {context && context.events && context.events.earningsUpcoming
                ? new Date(
                    0,
                    context.events.earningsUpcoming.date.split("-")[1] - 1
                  ).toLocaleString("en-US", { month: "short" })
                : "N/A"}
            </div>
            <div className="absolute top-[16px] left-[12px] text-xs text-[#2EBD85] font-semibold">
              {context && context.events && context.events.earningsUpcoming
                ? context.events.earningsUpcoming.date.split("-")[2]
                : "N/A"}
            </div>
          </div>
          <div className="pl-3 text-xs">
            {context && context.profile ? context.profile.symbol : "N/A"} to
            announce{" "}
            {context && context.events && context.events.earningsUpcoming
              ? context.events.earningsUpcoming.quarter.split(" ")[0]
              : "N/A"}{" "}
            earnings (Confirmed)
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
              {context && context.events && context.events.earningsPast
                ? new Date(
                    0,
                    context.events.earningsPast.date.split("-")[1] - 1
                  ).toLocaleString("en-US", { month: "short" })
                : "N/A"}
            </div>
            <div className="absolute top-[16px] left-[14px] text-xs text-[#979797] font-semibold">
              {context && context.events && context.events.earningsPast
                ? context.events.earningsPast.date.split("-")[2]
                : "N/A"}
            </div>
          </div>
          <div className="pl-3 text-xs">
            {context && context.profile ? context.profile.symbol : "N/A"}{" "}
            ex-Dividend for $
            {context && context.events && context.events.divPast
              ? context.events.divPast.amount
              : "N/A"}{" "}
            on{" "}
            {context && context.events && context.events.divPast
              ? updateDateFormat(context.events.divPast.payment_date)
              : "N/A"}
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
              {context && context.events && context.events.divPast
                ? new Date(
                    0,
                    context.events.divPast.payment_date.split("-")[1] - 1
                  ).toLocaleString("en-US", { month: "short" })
                : "N/A"}
            </div>
            <div className="absolute top-[16px] left-[12px] text-xs text-[#979797] font-semibold">
              {context && context.events && context.events.divPast
                ? context.events.divPast.payment_date.split("-")[2]
                : "N/A"}
            </div>
          </div>
          <div className="pl-3 text-xs">
            {context && context.profile ? context.profile.symbol : "N/A"}{" "}
            announced{" "}
            {context && context.events && context.events.earningsPast
              ? context.events.earningsPast.quarter.split(" ")[0]
              : "N/A"}{" "}
            earnings.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentalEvents;
