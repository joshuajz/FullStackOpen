import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDisplay = ({ country }) => {
  console.log(country);
  if (!country.name) {
    return <></>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} height="100" alt="The countries flag." />
    </div>
  );
};

const CountryListDisplay = ({ foundCountries, setDisplayCountry }) => {
  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (foundCountries.length === 1) {
    setDisplayCountry(foundCountries[0]);
    return <></>;
  } else {
    return (
      <div>
        {foundCountries.map((country) => (
          <p key={country.name}>
            {country.name}{" "}
            <button value={country} onClick={setDisplayCountry(this.value)}>
              show
            </button>
          </p>
        ))}
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [displayedCountry, setDisplayedCountry] = useState("");

  const inputChange = (event) => {
    setCountry(event.target.value);
  };

  const findCountries = () => {
    const list = countries.filter((c) =>
      c.name.toLowerCase().includes(country.toLowerCase())
    );
    return list;
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      Find Countries: <input onChange={inputChange} />
      <CountryListDisplay
        foundCountries={findCountries()}
        setDisplayCountry={setDisplayedCountry}
      />
      <CountryDisplay country={displayedCountry} />
    </div>
  );
};

export default App;
