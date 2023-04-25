import { FC } from "react";

import { useEffect } from "react";

interface TotalSummaryInfoProps {
  stockLiveData: any;
}

const TotalSummaryInfo: FC<TotalSummaryInfoProps> = ({ stockLiveData }) => {
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
        (stockLiveData && stockLiveData["change"] > 0
          ? " border-[#2EBD85]"
          : " border-[#e2433b]")
      }
    >
      <div className="text-2xl font-bold">
        $
        {stockLiveData
          ? stockLiveData["high"]
            ? stockLiveData["high"]
            : "NA"
          : "N/A"}
      </div>
      <div
        className={
          "text-xl" +
          (stockLiveData && stockLiveData["change"] > 0
            ? " text-[#2EBD85]"
            : " text-[#e2433b]")
        }
      >
        {stockLiveData
          ? stockLiveData["change"]
            ? getNumber(stockLiveData["change"])
            : "NA"
          : "N/A"}{" "}
        (
        {stockLiveData
          ? stockLiveData["change_p"]
            ? getNumber(
                parseFloat(stockLiveData["change_p"]).toFixed(2).toString()
              ) + "%"
            : "NA"
          : "N/A"}
        )
      </div>
      <div className="">
        Data as of{" "}
        {stockLiveData
          ? stockLiveData["timestamp"]
            ? changeDateFormat(stockLiveData["timestamp"].substr(0, 10))
            : "NA"
          : "N/A"}
      </div>
    </div>
  );
};

export default TotalSummaryInfo;
