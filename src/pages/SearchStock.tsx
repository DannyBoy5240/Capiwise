import { FC } from "react";

import { useState, useEffect } from "react";

const SearchStock: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   const fetchUrl =
  //     "https://eodhistoricaldata.com/api/search/{" +
  //     searchTerm +
  //     "}?api_token=" +
  //     "6434bb98780646.72507560";

  //   fetch(fetchUrl)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //       setFilteredOptions(json);
  //     });
  // }, [searchTerm]);

  const handleSelect = () => {
    // onSelect(option);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const startSearch = () => {
    const fetchUrl =
      "https://eodhistoricaldata.com/api/search/{" +
      "APPL" +
      "}?api_token=" +
      "6434bb98780646.72507560";

    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFilteredOptions(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="text-center">
      <p className="text-5xl font-bold">Capiwise</p>
      <p className="text-2xl mt-6 mb-11 mx-3">
        Search over 150k stocks in 71+ markets
      </p>
      <div className="flex items-center justify-center">
        <form method="GET" className="w-11/12 md:w-7/12 lg:w-5/12">
          <div className="relative border-2 rounded-full">
            <input
              type="search"
              className="py-2 text-base text-white bg-transparent focus:outline-none w-full rounded-full pl-5 pr-10"
              placeholder="Search Symbols or Company Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // onFocus={() => setShowDropdown(true)}
              onBlur={() => setShowDropdown(false)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 pr-5 focus:outline-none focus:shadow-outline"
                onClick={() => startSearch()}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3613 18.2168L14.6012 13.2662C15.8251 11.8113 16.4957 9.98069 16.4957 8.07499C16.4957 3.62251 12.8732 0 8.42069 0C3.96821 0 0.345703 3.62251 0.345703 8.07499C0.345703 12.5275 3.96821 16.15 8.42069 16.15C10.0922 16.15 11.6851 15.6458 13.047 14.6888L17.8432 19.677C18.0436 19.8852 18.3133 20 18.6022 20C18.8757 20 19.1352 19.8957 19.3321 19.7061C19.7506 19.3034 19.764 18.6357 19.3613 18.2168ZM8.42069 2.10652C11.7118 2.10652 14.3892 4.78391 14.3892 8.07499C14.3892 11.3661 11.7118 14.0435 8.42069 14.0435C5.12961 14.0435 2.45222 11.3661 2.45222 8.07499C2.45222 4.78391 5.12961 2.10652 8.42069 2.10652Z"
                    fill="#2EBD85"
                  />
                </svg>
              </button>
            </span>

            {showDropdown && (
              <ul className="absolute z-10 w-full p-2 mt-1 bg-white rounded-md shadow-lg">
                {filteredOptions.map((option: any) => (
                  <li
                    key={option.Code}
                    // onClick={() => handleSelect(option)}
                    className="px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    {option.Code}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchStock;
