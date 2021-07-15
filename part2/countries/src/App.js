import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryNames, setCountryNames] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      {countries.map((country) => (
        <p>{country.name}</p>
      ))}
    </div>
  );
}

export default App;
