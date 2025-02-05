import { createContext, useContext, useEffect, useState } from "react";
import { Country } from "../types/CountryTypes";

interface CountriesContextValue {
  countries: Country[];
}

const CountriesContext = createContext<CountriesContextValue | undefined>(undefined);

export const CountriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <CountriesContext.Provider value={{ countries }}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountriesContext = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
};