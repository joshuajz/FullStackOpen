import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const CountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState({
    'current': {
      'weather_icons': ['none'],
      'wind_speed': 'undefined',
      'wind_dir': 'undefined',
      'temperature': 'undefined'
    }
  })


  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios.get("http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital)
    .then((response) => {
      setWeather(response.data)
    })
  }, [country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} height="100" alt="The countries flag." />
      <h3>Weather in {country.capital}</h3>
      <p><strong>Temperature:</strong> {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]} alt="Display of the weather"></img>
      <p><strong>Wind:</strong> {weather.current.wind_speed}mph | Direction: {weather.current.wind_dir}</p>

    </div>
  );
};

const handleClick = (value) => {
  const country = JSON.parse(value.currentTarget.value)
  const element = document.getElementById("country_info")
  ReactDOM.render(<CountryDisplay country={country} />, element)
}

const CountryDisplayList = ({countryList}) => {
  return (
    <div>
      {countryList.map((country) => (
        <p key={country.name}>
          {country.name}{" "}
          <button value={JSON.stringify(country)} onClick={(value) => {handleClick(value)}}>show</button>
        </p>
      ))}
    </div>
  )
}

const Display = ({foundCountries}) => {
  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  }
  else if (foundCountries.length === 1) {
    const element = document.getElementById("country_info")
    ReactDOM.render(<CountryDisplay country={foundCountries[0]} />, element)
    return <></>
  }
  else {
    return <CountryDisplayList countryList={foundCountries}/>
  }
}

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
      <Display foundCountries={findCountries()}/>
      <div id="country_info">
      </div>
    </div>
  );
};

export default App;
