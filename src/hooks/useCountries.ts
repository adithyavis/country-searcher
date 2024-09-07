import useSWR, { Fetcher } from "swr";
import Country from "../types/country";

const fetcher: Fetcher<Country[], string> = (url) =>
  fetch(url).then((res) => res.json());

const useCountries = () => {
  return useSWR(
    "https://restcountries.com/v3.1/independent?status=true&fields=name,capital,currencies,languages,continents,population,timezones,flags",
    fetcher,
  );
};

export default useCountries;
