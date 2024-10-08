type Country = {
  name: {
    common: string;
  };
  capital: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  continents: string[];
  population: number;
  timezones: string[];
  flags: {
    png: string;
    svg: string;
  };
};

export default Country;
