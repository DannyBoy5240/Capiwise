import { FC } from "react";

const CompanyProfile = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Company Profile
      </div>
      {/* Sector & Industry */}
      <div className="py-2 border-b border-b-[#040B11] text-xs">
        <div className="flex py-1">
          <div className="text-[#979797]">Sector</div>
          <div className="pl-2 text-[#20A5F1]">Information Technology</div>
        </div>
        <div className="flex py-1">
          <div className="text-[#979797]">Industry</div>
          <div className="pl-2 text-[#20A5F1]">
            Technology Hardware, Storage & Peripherals
          </div>
        </div>
      </div>
      {/* Biography */}
      <div className="py-2 border-b border-b-[#040B11] text-xs">
        <div className="font-bold text-[#979797]">Biography</div>
        <div className="py-1">
          Apple Inc. is an American multinational technology company
          headquartered in Cupertino, California, that designs, develops and
          sells consumer electronics, computer software, and online services…
          <span className="text-[#20A5F1]">Show more</span>
        </div>
      </div>
      {/* Address */}
      <div className="py-2 border-b border-b-[#040B11] text-xs">
        <div className="font-bold text-[#979797]">
          Country<span className="pl-1 text-white font-normal">US</span>
        </div>
        <div className="font-bold text-[#979797]">
          Exchange
          <span className="pl-1 text-white font-normal">
            NASDAQ/NGS (GLOBAL SELECT MARKET)
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Founded
          <span className="pl-1 text-white font-normal">
            April 1, 1976, Cupertino, California, US
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Headquarters
          <span className="pl-1 text-white font-normal">
            Cupertino, California, US
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          CEO<span className="pl-1 text-white font-normal">Tim Cook</span>
        </div>
        <div className="font-bold text-[#979797]">
          Website
          <span className="pl-1 text-[#20A5F1] font-normal">apple.com</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
