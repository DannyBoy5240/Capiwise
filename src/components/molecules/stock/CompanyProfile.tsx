import { FC } from "react";

interface CompanyProfileProps {
  context: any;
}

const CompanyProfile: FC<CompanyProfileProps> = ({ context }) => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Company Profile
      </div>
      {/* Sector & Industry */}
      <div className="py-2 border-b border-b-[#040B11] text-xs">
        <div className="flex py-1">
          <div className="text-[#979797]">Sector</div>
          <div className="pl-2 text-[#20A5F1]">
            {context ? context["sector"] : "N/A"}
          </div>
        </div>
        <div className="flex py-1">
          <div className="text-[#979797]">Industry</div>
          <div className="pl-2 text-[#20A5F1]">
            {context ? context["industry"] : "N/A"}
          </div>
        </div>
      </div>
      {/* Biography */}
      <div className="py-2 border-b border-b-[#040B11] text-xs">
        <div className="font-bold text-[#979797]">Biography</div>
        <div className="py-1">
          {context ? context["biography"].slice(0, 250) : "N/A"}
          <span className="text-[#20A5F1] pl-2">Show more</span>
        </div>
      </div>
      {/* Address */}
      <div className="py-2 text-xs">
        <div className="font-bold text-[#979797]">
          Country
          <span className="pl-1 text-white font-normal">
            {context ? context["country"] : "N/A"}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Exchange
          <span className="pl-1 text-white font-normal">
            {context ? context["exchange"] : "N/A"}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Founded
          <span className="pl-1 text-white font-normal">N/A</span>
        </div>
        <div className="font-bold text-[#979797]">
          Headquarters
          <span className="pl-1 text-white font-normal">
            {context ? context["headquarter"] : "N/A"}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          CEO
          <span className="pl-1 text-white font-normal">
            {context ? context["CEO"] : "N/A"}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Website
          <span className="pl-1 text-[#20A5F1] font-normal">
            {context ? context["website"] : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
