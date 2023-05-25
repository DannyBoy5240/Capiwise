import { FC } from "react";

import logoIcon from "../assets/logo.svg";
import facebookIcon from "../assets/social_facebook_ico.svg";
import twitterIcon from "../assets/social_twitter_ico.svg";
import linkedinIcon from "../assets/social_linkedin_ico.svg";
import instagramIcon from "../assets/social_instagram_ico.svg";
import youtubeIcon from "../assets/social_youtube_ico.svg";
import qrCodeIcon from "../assets/qrcode_ico.svg";

import nortonSecuredIcon from "../assets/norton_secured_ico.svg";
import tlsEncryptedIcon from "../assets/tls_encrypted_ico.svg";

const Footer: FC = () => {
  return (
    <div>
      <div className="flex justify-stretch px-7 py-3 bg-[#0B1620] text-xs">
        {/* Logo & Social Medias */}
        <div className="w-1/4 h-full p-2 flex flex-col justify-between text-base">
          <div>
            <div>
              <img src={logoIcon} />
            </div>
            <div className="pr-2 py-2 text-[#979797] font-thin">
              The "CapiWise App" is about a pioneer of AI checking the valuation
              of a large variety of stocks, ETFs, with a fast, reliable, and
              easy-to-use platform. Free to try, quick to sign up.
            </div>
          </div>
          <div>
            <div className="text-[#979797] font-bold py-2">Follow us</div>
            <div className="flex justify-space pt-2">
              <div>
                <img src={facebookIcon} className="max-w-none" />
              </div>
              <div className="px-2">
                <img src={twitterIcon} className="max-w-none" />
              </div>
              <div className="px-2">
                <img src={linkedinIcon} className="max-w-none" />
              </div>
              <div className="px-2">
                <img src={instagramIcon} className="max-w-none" />
              </div>
              <div className="px-2">
                <img src={youtubeIcon} className="max-w-none" />
              </div>
            </div>
          </div>
        </div>
        {/* Instrument & Privacy */}
        <div className="w-1/4 h-full p-2 flex flex-col justify-between text-base text-[#979797]">
          <div>
            <div className="font-bold">Instrument</div>
            <div className="py-2">
              <div>Stocks</div>
              <div>Watchlist</div>
              <div>my portfolio</div>
              <div>plans</div>
            </div>
          </div>
          <div className="pt-8">
            <div className="font-bold">Privacy and regulations</div>
            <div className="pt-2">
              <div>Privacy & Security</div>
              <div>Terms & Conditions</div>
              <div>General risk disclosure</div>
              <div>Legal notice</div>
              <div>Financial services guide</div>
              <div>Regulation & License</div>
            </div>
          </div>
        </div>
        {/* Who we are & Support */}
        <div className="w-1/4 h-full p-2 flex flex-col justify-between text-base text-[#979797]">
          <div>
            <div className="font-bold">Who we are</div>
            <div className="py-2">
              <div>About us</div>
              <div>our values</div>
              <div>our vision</div>
            </div>
          </div>
          <div className="pt-8">
            <div className="font-bold">Support</div>
            <div className="pt-2">
              <div>FAQ's</div>
              <div>Help centre</div>
              <div>Contact us</div>
            </div>
          </div>
        </div>
        {/* Learn more */}
        <div className="w-1/4 h-full pl-2 flex flex-col justify-between text-base text-[#979797]">
          <div>
            <div className="font-bold">Learn more</div>
            <div className="py-2">
              <div>How it works</div>
              <div>Financial freedom methods</div>
              <div>Avoid scam</div>
              <div>Buy and sell explained</div>
              <div>Market research</div>
            </div>
          </div>
          <div className="pt-8">
            <div className="flex items-center">
              <div className="p-3.5 rounded-full bg-black z-10">
                <img src={qrCodeIcon} className="max-w-none" />
              </div>
              <div className="bg-black py-2 pl-4 pr-8 rounded-tr-full rounded-br-full ml-[-14px]">
                <div className="font-bold text-[#2EBD87]">Download Now</div>
                <div className="text-white">
                  Scan this code with
                  <br />
                  your phone's camera
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 border-b border-b-[#979797]"></div>
      <div className="flex flex-col px-7 py-3 bg-[#0B1620]">
        <div className="py-4">© CapiWise. All rights reserved.</div>
        <div className="flex pt-8 pb-4 items-center">
          <div className="pr-2">
            <img src={nortonSecuredIcon} className="max-w-none" />
          </div>
          <div className="pl-2">
            <img src={tlsEncryptedIcon} className="max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
