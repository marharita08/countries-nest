type Country = {
  name: string;
  countryCode: string;
};

type CountryInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
};

type FlagInfo = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

type PopulationCounts = {
  year: number;
  value: number;
};

type PopulationInfo = {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCounts[];
};

type CountryFullInfo = CountryInfo & {
  flagUrl: string;
  population: PopulationCounts[];
};

export {
  Country,
  CountryInfo,
  FlagInfo,
  PopulationCounts,
  PopulationInfo,
  CountryFullInfo,
};
