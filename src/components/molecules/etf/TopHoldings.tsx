import { FC } from "react";

const TopHoldings = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Top Holdings
      </div>
      <div className="flex justify-between py-2">
        <div>
          <div className="text-sm text-white font-semibold">
            Top 10 Holdings
          </div>
          <div className="text-[10px] text-[#979797]">As of 02/28/2021</div>
        </div>
        <div>
          <div className="text-sm text-white font-bold">50.95%</div>
          <div className="text-[10px] text-[#979797]">of 102 total</div>
        </div>
      </div>
      {/* Symbol + Weight */}
      <div className="flex w-full">
        <div className="w-1/2 pr-2">
          <div className="text-xs font-bold flex justify-between border-b border-b-white py-2">
            <div>Symbol</div>
            <div>Weight</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">AAPL</div>
              <div>Apple Inc</div>
            </div>
            <div className="pt-1">10.98%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">MSFT</div>
              <div>Microsoft Corp</div>
            </div>
            <div className="pt-1">9.52%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">AMZN</div>
              <div>Amazon.com Inc</div>
            </div>
            <div className="pt-1">8.34%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">TSLA</div>
              <div>Tesla Inc</div>
            </div>
            <div className="pt-1">4.25%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">FB</div>
              <div>Facebook INC A</div>
            </div>
            <div className="pt-1">3.79%</div>
          </div>
        </div>
        <div className="w-1/2 pL-2">
          <div className="text-xs font-bold flex justify-between border-b border-b-white py-2">
            <div>Symbol</div>
            <div>Weight</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">GOOG</div>
              <div>Alphabet Inc Class C</div>
            </div>
            <div className="pt-1">3.63%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">GOOGL</div>
              <div>Alphabet Inc A</div>
            </div>
            <div className="pt-1">3.32%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">NVDA</div>
              <div>NVIDIA Corp</div>
            </div>
            <div className="pt-1">2.70%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">PYPL</div>
              <div>PayPal Holdings Inc</div>
            </div>
            <div className="pt-1">2.32%</div>
          </div>
          <div className="text-xs flex justify-between py-2 border-b border-b-[#252A2D]">
            <div>
              <div className="text-[#2EBD85] font-bold">INTC</div>
              <div>Intel Corp</div>
            </div>
            <div className="pt-1">2.12%</div>
          </div>
        </div>
      </div>
      {/* View holdings */}
      <div className="py-2 text-xs">View 102 holdings</div>
    </div>
  );
};

export default TopHoldings;
