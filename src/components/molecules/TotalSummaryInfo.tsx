import { FC } from "react";

import { useEffect } from "react";

interface TotalSummaryInfoProps {
  context: any;
}

const TotalSummaryInfo: FC<TotalSummaryInfoProps> = ({ context }) => {
  const getNumber = (num: any) => {
    if (num > 0) return "+" + num;
    else return num;
  };

  const convertingTimestamp = (tm: number) => {
    const timestamp: number = tm; // Unix timestamp in seconds
    const date: Date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const dateString: string = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return dateString;
  };

  const changeDateFormat = (dateString: string) => {
    type dateType = "numeric" | "2-digit" | undefined;

    const date = new Date(dateString);
    const options = {
      month: "short" as dateType,
      day: "numeric" as dateType,
      year: "numeric" as dateType,
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  return (
    <div
      className={
        "flex flex-col border-l-4 pl-4 pr-1" +
        (context && context["day1Range"] && context["day1Range"]["change"] > 0
          ? " border-[#2EBD85]"
          : " border-[#e2433b]")
      }
    >
      <div className="text-2xl font-bold">
        {context && context["day1Range"]
          ? context["isMarketOpen"]
            ? parseFloat(context["day1Range"]["open"]).toFixed(2)
            : parseFloat(context["day1Range"]["close"]).toFixed(2)
          : "N/A"}
      </div>
      <div
        className={
          "text-xl" +
          (context && context["day1Range"] && context["day1Range"]["change"] > 0
            ? " text-[#2EBD85]"
            : " text-[#e2433b]")
        }
      >
        {context && context["day1Range"]
          ? context["day1Range"]["change"]
            ? getNumber(
                parseFloat(context["day1Range"]["change"]).toFixed(2).toString()
              )
            : "N/A"
          : "N/A"}{" "}
        (
        {context && context["day1Range"]
          ? context["day1Range"]["percentChange"]
            ? getNumber(
                parseFloat(context["day1Range"]["percentChange"])
                  .toFixed(2)
                  .toString()
              ) + "%"
            : "N/A"
          : "N/A"}
        )
      </div>
      <div className="">
        Data as of{" "}
        {context
          ? context["time"]
            ? changeDateFormat(convertingTimestamp(context["time"]))
            : "N/A"
          : "N/A"}
      </div>
    </div>
  );
};

export default TotalSummaryInfo;
