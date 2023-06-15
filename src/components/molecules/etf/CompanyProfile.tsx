import { FC } from "react";

interface CompanyProfileProps {
  context: any;
}

const CompanyProfile: FC<CompanyProfileProps> = ({ context }) => {
  console.log("company profiel context -> ", context);

  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full text-xs">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Company Profile
      </div>
      {/* Biography */}
      <div className="py-2 border-b border-b-[#040B11]">
        <div className="font-bold py-1">Biography</div>
        <div className="py-1">
          {context ? context["biography"].slice(0, 250) : "N/A"}
          <span className="text-[#20A5F1] pl-2">Show more</span>
        </div>
      </div>
      {/* What is it holding */}
      <div className="py-2 border-b border-b-[#040B11]">
        <div className="font-bold py-1">What is it holding?</div>
        <div className="font-bold text-[#979797]">
          Top Sector
          <span className="pl-1 text-[#20A5F1] font-normal">
            {context ? context["topSector"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Top Industry
          <span className="pl-1 text-[#20A5F1] font-normal">
            {context ? context["topIndustry"] : ""}
          </span>
        </div>
      </div>
      {/* Address */}
      <div className="py-2">
        <div className="font-bold py-1">How is it structured?</div>
        <div className="font-bold text-[#979797]">
          Sponsor
          <span className="pl-1 text-white font-normal">
            {context ? context["sponsor"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Inception
          <span className="pl-1 text-white font-normal">
            {context ? context["inception"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Country
          <span className="pl-1 text-white font-normal">
            {context ? context["country"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          ETF Structure
          <span className="pl-1 text-white font-normal">
            {context ? context["etfStructure"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Asset Class
          <span className="pl-1 text-white font-normal">
            {context ? context["etfStructure"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Investment Philosophy
          <span className="pl-1 text-white font-normal">
            {context ? context["investmentPhilosophy"] : ""}
          </span>
        </div>
        <div className="font-bold text-[#979797]">
          Website
          <span className="pl-1 text-[#20A5F1] font-normal">
            {context
              ? context["website"].substring(
                  context["website"].indexOf("https://www") + 12
                )
              : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
