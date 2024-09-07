import { useMemo } from "react";
import Country from "src/types/country";

const useFilterCountries = (
  countries: Country[] | undefined,
  searchQuery: string,
) => {
  return useMemo(
    () =>
      countries
        ? countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          )
        : [],
    [countries, searchQuery],
  );
};

export default useFilterCountries;
