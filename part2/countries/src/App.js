import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayCountries = ({ countries, foundCountries }) => {
  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (foundCountries.length === 1) {
    const country = foundCountries[0];
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
  } else {
    return (
      <div>
        {foundCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))}
      </div>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

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
      <DisplayCountries
        countries={countries}
        foundCountries={findCountries()}
      />
      {/* {findCountries().map((c) => (
        <p>{c}</p>
      ))} */}
      {/* {countries.map((country) => (
        <p>{country.name}</p>
      ))} */}
    </div>
  );
};

export default App;
