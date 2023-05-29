import { FC, useState } from "react";

const PortfolioComposition = () => {
  const [curStatus, setCurStatus] = useState(0);
  const [exposureStatus, setExposureStatus] = useState(false);

  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Portfolio Composition
      </div>
      <div className="py-3">
        <div className="w-full h-[45px] text-sm flex">
          <div
            className={
              "w-1/3 rounded-tl-full rounded-bl-full flex flex-col text-center justify-center hover:cursor-pointer " +
              (curStatus == 0
                ? "bg-[#2EBD85] text-white"
                : "border-l border-t border-b border-[#979797] text-[#979797]")
            }
            onClick={() => setCurStatus(0)}
          >
            <div>Region & Country</div>
          </div>
          <div
            className={
              "w-1/3 flex flex-col text-center justify-center hover:cursor-pointer " +
              (curStatus == 1
                ? "bg-[#2EBD85] text-white"
                : "border-t border-b border-[#979797] text-[#979797]")
            }
            onClick={() => setCurStatus(1)}
          >
            <div>Market Cap</div>
          </div>
          <div
            className={
              "w-1/3 rounded-tr-full rounded-br-full flex flex-col text-center justify-center hover:cursor-pointer " +
              (curStatus == 2
                ? "bg-[#2EBD85] text-white"
                : "border-r border-t border-b border-[#979797] text-[#979797]")
            }
            onClick={() => setCurStatus(2)}
          >
            <div>Sector & Industry</div>
          </div>
        </div>
      </div>
      {curStatus == 0 ? (
        <div className="text-sm text-white">
          <div>QQQ doesn`t have a specific geographic objective</div>
          <div className="py-2 flex">
            <div className="w-1/2 pr-2">
              <div className="py-1 border-b border-[#252A2D]">
                Regional Exposure
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">North America</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "95.95%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">95.95%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">China</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "2.90%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">2.90%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Latin America</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.67%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.67%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Europe</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.35%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.35%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Middle East</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.13%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.13%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Africa</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.00%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.00%</div>
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <div className="py-1 border-b border-[#252A2D]">
                Country Exposure
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">United States</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "95.95%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">95.95%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">China</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "2.90%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">2.90%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Brazil</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.67%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.67%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Netherlands</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.35%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.35%</div>
              </div>
              {/*  */}
              <div className="py-2 border-t border-t-[#252A2D]">
                <div className="text-[#979797] text-[10px]">
                  As of 02/28/2021
                </div>
                <div className="text-white text-xs">View all</div>
              </div>
            </div>
          </div>
        </div>
      ) : curStatus == 1 ? (
        <div className="text-sm text-white">
          <div>QQQ market cap as of 02/28/2023</div>
          <div className="py-2">
            <div className="py-1 border-b border-[#252A2D]">
              Market Capitalization Exposure
            </div>
            {/*  */}
            <div className="w-1/2">
              <div className="flex items-center py-2">
                <div className="w-2/5">Giant</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "60.23%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">60.23%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Large Cap</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "32.87%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">32.87%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Medium Cap</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "6.90%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">6.90%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Small Cap</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.00%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.00%</div>
              </div>
              {/*  */}
              <div className="flex items-center py-2">
                <div className="w-2/5">Micro Cap</div>
                <div className="w-2/5 h-[10px] bg-black rounded-full">
                  <div
                    className="bg-[#2EBD85] w-full h-full rounded-full"
                    style={{ width: "0.00%" }}
                  ></div>
                </div>
                <div className="w-1/5 text-right">0.00%</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-white">
          <div>
            {!exposureStatus
              ? "QQQ doesn't have a specific sector objective"
              : "QQQ doesn't have a specific industry objective"}
          </div>
          {!exposureStatus ? (
            <div className="py-2 flex">
              <div className="w-1/2 pr-2">
                <div className="py-1 border-b border-[#252A2D]">
                  <span
                    className={
                      "pr-2 border-r-2 border-r-black hover:cursor-pointer " +
                      (!exposureStatus
                        ? "text-white font-bold"
                        : "text-[#979797]")
                    }
                    onClick={() => setExposureStatus(false)}
                  >
                    Sector Exposure
                  </span>
                  <span
                    className={
                      "pl-2 hover:cursor-pointer " +
                      (exposureStatus
                        ? "text-white font-bold"
                        : "text-[#979797]")
                    }
                    onClick={() => setExposureStatus(true)}
                  >
                    Industry Exposure
                  </span>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Information Tech...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "49.45%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">49.45%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Communication...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "16.27%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">16.27%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Latin America</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "0.67%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">0.67%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Consumer Disc...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "14.95%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">14.95%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Health Care</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "6.25%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">6.25%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Consumer Staples</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "5.97%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">5.97%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Industrials</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "4.34%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">4.34%</div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="py-1 border-b border-[#252A2D] text-[#0B1620]">
                  X
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Financials</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "1.20%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">1.20%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Utilities</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "1.16%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">1.16%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Energy</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "0.41%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">0.41%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-2 flex">
              <div className="w-1/2 pr-2">
                <div className="py-1 border-b border-[#252A2D]">
                  <span
                    className={
                      "pr-2 border-r-2 border-r-black hover:cursor-pointer " +
                      (!exposureStatus
                        ? "text-white font-bold"
                        : "text-[#979797]")
                    }
                    onClick={() => setExposureStatus(false)}
                  >
                    Sector Exposure
                  </span>
                  <span
                    className={
                      "pl-2 hover:cursor-pointer" +
                      (exposureStatus
                        ? "text-white font-bold"
                        : "text-[#979797]")
                    }
                    onClick={() => setExposureStatus(true)}
                  >
                    Industry Exposure
                  </span>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Software</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "18.36%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">18.36%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Semiconductors...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "16.88%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">16.88%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Technology Hard...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "12.34%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">12.34%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Interactive Media...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "10.95%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">10.95%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Broadline Retail</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "7.40%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">7.40%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Biotechnology</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "4.11%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">4.11%</div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <div className="py-1 border-b border-[#252A2D] text-[#0B1620]">
                  X
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Automobiles</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "4.08%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">4.08%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Beverages</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "2.73%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">2.73%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Hotels, Rest...</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "2.45%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">2.45%</div>
                </div>
                {/*  */}
                <div className="flex items-center py-2">
                  <div className="w-2/5">Entertainment</div>
                  <div className="w-2/5 h-[10px] bg-black rounded-full">
                    <div
                      className="bg-[#2EBD85] w-full h-full rounded-full"
                      style={{ width: "2.21%" }}
                    ></div>
                  </div>
                  <div className="w-1/5 text-right">2.21%</div>
                </div>
                {/*  */}
                <div className="py-2 border-t border-t-[#252A2D]">
                  <div className="text-[#979797] text-[10px]">
                    As of 02/28/2023
                  </div>
                  <div className="text-white text-xs">View full listing</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioComposition;
