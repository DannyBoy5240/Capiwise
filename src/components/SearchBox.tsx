import { FC } from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchBoxFlag, setSearchBoxFlag] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm === "") setShowDropdown(false);
    else startSearch();
  }, [searchTerm]);

  const handleSelect = (option: any) => {
    setSearchTerm("");
    setShowDropdown(false);

    if (option.Type == "Common Stock")
      navigate("/stocksummary", {
        state: {
          item: option,
        },
      });
    else
      navigate("/etfsummary", {
        state: {
          item: option,
        },
      });
    window.location.reload();
  };

  const startSearch = async () => {
    const fetchURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockSearch?ticker=" +
      searchTerm +
      "&limit=10";

    const response = await fetch(fetchURL);
    const jsonData = await response.json();
    if (jsonData.length > 0) {
      setFilteredOptions(jsonData);
      setShowDropdown(true);
    } else {
      setFilteredOptions([]);
      setShowDropdown(false);
    }
  };

  const handleSearchFocus = () => {
    if (searchTerm != "" && filteredOptions.length > 0) {
      setShowDropdown(true);
      document.getElementById("search_box")?.classList.remove("bg-transparent");
      if (
        !document
          .getElementById("search_box")
          ?.classList.contains("bg-[#0B1620]")
      ) {
        document.getElementById("search_box")?.classList.add("bg-[#0B1620]");
      }
    }
  };

  const handleSearchBlur = (e: any) => {
    const rect = document
      .getElementById("symbol-list")
      ?.getBoundingClientRect();
    // const isInDivArea =
    //   rect.left <= event.clientX &&
    //   event.clientX <= rect.right &&
    //   rect.top <= event.clientY &&
    //   event.clientY <= rect.bottom;

    // if (!isInDivArea) {
    setShowDropdown(false);
    document.getElementById("search_box")?.classList.add("bg-transparent");
    document.getElementById("search_box")?.classList.remove("bg-[#0B1620]");
    // }
  };

  const clearSearchBox = () => {
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key == "Enter" && searchTerm != "") startSearch();
  };

  return (
    <div className="grow flex items-center justify-center">
      <div className="relative border-2 rounded-full w-11/12 md:w-7/12 lg:w-1/2">
        <input
          className="py-2 text-base text-white bg-transparent focus:outline-none w-full rounded-full pl-5 pr-20"
          id="search_box"
          placeholder="Search Symbols or Company Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => handleSearchFocus()}
          // onBlur={(e) => handleSearchBlur(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pl-2">
          {searchTerm !== "" ? (
            <button onClick={() => clearSearchBox()}>
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.94531 0.625L5.08594 4.59375L7.22656 0.625H9.90625L6.60156 6.26562L9.99219 12H7.28906L5.08594 7.95312L2.88281 12H0.164062L3.5625 6.26562L0.25 0.625H2.94531ZM19.2443 0.625V12H17.7365V0.625H19.2443Z"
                  fill="#979797"
                />
              </svg>
            </button>
          ) : (
            <></>
          )}

          <button
            className="p-1 ml-2 pr-5 focus:outline-none focus:shadow-outline"
            onClick={(e) => startSearch()}
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
          <div
            className="absolute z-10 w-full px-1 py-2 mt-1 bg-[#0B1620] rounded-md shadow-lg overflow-auto scrollbar-hide h-48"
            id="symbol-list"
          >
            <div className="text-xl text-left px-3 py-2">Symbols</div>
            <ul>
              {filteredOptions.map((option: any) => (
                <li
                  key={
                    option.Code + option.Name + option.Type + option.Exchange
                  }
                  onClick={() => handleSelect(option)}
                  className="p-3 cursor-pointer hover:bg-[#040B11]"
                >
                  <div className="flex text-sm w-full items-center">
                    <div className="w-3/12 text-left font-bold">
                      {option.Code}
                    </div>
                    <div className="w-7/12 text-left text-xs font-bold">
                      {option.Name}
                    </div>
                    <div className="w-2/12 text-right text-xs">
                      {(option.Type === "Common Stock"
                        ? "Equity"
                        : option.Type) +
                        " - " +
                        option.Exchange}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
