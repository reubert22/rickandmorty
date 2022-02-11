import { useState, useEffect } from "react";
import axios from "axios";
import { CharactersType } from "../types/Characters";

export const useGetCharacters = () => {
  const [characters, setCharacters] = useState<CharactersType[]>([]);
  const [info, setInfo] = useState();
  const [url, fetchCharacters] = useState("");
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isErrorCharacters, setIsErrorCharacters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsErrorCharacters(false);
      setIsLoadingCharacters(true);

      try {
        const response = await axios(url);

        setCharacters([...characters, ...response.data.results]);
        setInfo(response.data.info);
      } catch (error) {
        setIsErrorCharacters(true);
      }

      setIsLoadingCharacters(false);
    };

    if (!!url) fetchData();
  }, [url]);

  return {
    characters,
    info,
    isLoadingCharacters,
    isErrorCharacters,
    fetchCharacters,
  };
};
