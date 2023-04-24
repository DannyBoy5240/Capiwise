import { FC } from "react";

import SearchBox from "../components/SearchBox";

const { Configuration, OpenAIApi } = require("openai");

const SearchStock: FC = () => {
  const testAPI = async () => {
    console.log("Hello Test OPENAI");

    const configuration = new Configuration({
      apiKey: "sk - I1HXzHgkvTIeyMcKckzzT3BlbkFJBWLMMRSKckqkXGe1AAHM",
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Correct this to standard English:\n\nShe no went to the market.",
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
  };

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
