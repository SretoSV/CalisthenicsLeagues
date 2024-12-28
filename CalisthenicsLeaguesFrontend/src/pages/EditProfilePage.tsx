import { useEffect, useState } from "react";

interface Country {
    name: {
      common: string;
    };
    flags: {
      png: string;
      svg: string;
    };
  }

export function EditProfilePage(){
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
    }, []);
  
    return (
      <div>
        {
            countries.map((country) => {
                return (
                    <div key={country.name.common}>
                        {country.name.common}
                        <img
                        src={country.flags.png}
                        alt={`${country.name.common} flag`}
                        style={{ width: "100px", marginRight: "50px" }}
                        />
                    </div>
                )
            })
        }
      </div>
    );
}