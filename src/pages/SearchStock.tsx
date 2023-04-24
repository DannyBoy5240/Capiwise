import { FC } from "react";

import SearchBox from "../components/SearchBox";

const SearchStock: FC = () => {
  return (
    <div className="text-center">
      <p className="text-5xl font-bold">Capiwise</p>
      <p className="text-2xl mt-6 mb-11 mx-3">
        Search over 150k stocks in 71+ markets
      </p>
      <SearchBox />
    </div>
  );
};

export default SearchStock;
