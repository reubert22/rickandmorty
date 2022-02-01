import { useState, useEffect } from "react";
import axios from "axios";
import { CharactersType } from "../types/Characters";

export const useGetCharacters = () => {
  const [characters, getCharacters] = useState<CharactersType[]>([]);
  const [url, fetchCharacters] = useState("");
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isErrorCharacters, setIsErrorCharacters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsErrorCharacters(false);
      setIsLoadingCharacters(true);

      try {
        const response = await axios(url);

        getCharacters(response.data.results);
      } catch (error) {
        setIsErrorCharacters(true);
      }

      setIsLoadingCharacters(false);
    };

    if (!!url) fetchData();
  }, [url]);

  return {
    characters,
    isLoadingCharacters,
    isErrorCharacters,
    fetchCharacters,
  };
};
