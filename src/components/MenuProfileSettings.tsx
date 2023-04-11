import { FC } from "react";

const MenuProfileSettings: FC = () => {
  return (
    <div className="flex items-center">
      <div className="p-2.5">
        <p className="text-[#2EBD85] font-bold text-base">JA</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm font-bold mx-2">Jimmy Adams</p>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99997 7.42042C5.7849 7.42042 5.56987 7.3383 5.4059 7.17441L0.24617 2.01463C-0.0820565 1.6864 -0.0820565 1.15424 0.24617 0.826148C0.574263 0.498055 1.10632 0.498055 1.43457 0.826148L5.99997 5.39181L10.5654 0.826308C10.8936 0.498214 11.4256 0.498214 11.7537 0.826308C12.0821 1.1544 12.0821 1.68656 11.7537 2.01479L6.59404 7.17457C6.42999 7.33849 6.21495 7.42042 5.99997 7.42042Z"
            fill="#464F56"
          />
        </svg>
      </div>
    </div>
  );
};

export default MenuProfileSettings;
