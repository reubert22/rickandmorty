import { useState, useEffect } from "react";
import axios from "axios";
import { LocationsType } from "../types/Locations";

export const useGetLocation = () => {
  const [locations, setLocations] = useState<LocationsType[]>([]);
  const [url, fetchLocation] = useState("");
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [isErrorLocations, setIsErrorLocations] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsErrorLocations(false);
      setIsLoadingLocations(true);

      try {
        const response = await axios(url);

        setLocations(response.data.results);
      } catch (error) {
        setIsErrorLocations(true);
      }

      setIsLoadingLocations(false);
    };

    if (!!url) fetchData();
  }, [url]);

  return { locations, isLoadingLocations, isErrorLocations, fetchLocation };
};
