import { FC } from "react";

const CompanyProfile = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full text-xs">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Company Profile
      </div>
      {/* Biography */}
      <div className="py-2 border-b border-b-[#040B11]">
        <div className="font-bold py-1">Biography</div>
        <div className="py-1">
          The investment seeks investment results that generally correspond to
          the price and yield performance of the NASDAQ-100 Index®. To maintain
          the correspondence between the composition and weights…
          <span className="text-[#20A5F1]">Show more</span>
        </div>
      </div>
      {/* What is it holding */}
      <div className="py-2 border-b border-b-[#040B11]">
        <div className="font-bold py-1">What is it holding?</div>
        <div className="font-bold text-[#979797]">
          Top Sector
          <span className="pl-1 text-[#20A5F1] font-normal">
            Information Technology
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Top Industry
          <span className="pl-1 text-[#20A5F1] font-normal">
            Software, Semiconductors & Semicond...
          </span>
        </div>
      </div>
      {/* Address */}
      <div className="py-2">
        <div className="font-bold py-1">How is it structured?</div>
        <div className="font-bold text-[#979797]">
          Sponsor
          <span className="pl-1 text-white font-normal">
            Invesco Capital Management LLC
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Inception
          <span className="pl-1 text-white font-normal">03/10/1999</span>
        </div>
        <div className="font-bold text-[#979797]">
          Country
          <span className="pl-1 text-white font-normal">US</span>
        </div>
        <div className="font-bold text-[#979797]">
          ETF Structure
          <span className="pl-1 text-white font-normal">
            Unit Investment Trust
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Asset Class<span className="pl-1 text-white font-normal">Equity</span>
        </div>
        <div className="font-bold text-[#979797]">
          Investment Philosophy
          <span className="pl-1 text-white font-normal">Passively Managed</span>
        </div>
        <div className="font-bold text-[#979797]">
          Website
          <span className="pl-1 text-[#20A5F1] font-normal">invesco.com</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
