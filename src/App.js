import React, { useState } from 'react';
import { FaCloudSun } from 'react-icons/fa';

const api = {
  key: "aea747d8673e5dcc65261d040804dfae",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ?  ((weather.main.temp > 20) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box-container">
          <h2 className="title">React Weather App <FaCloudSun className="cloudIcon"/></h2>
          <label>Enter a Location:</label>
          <input 
            type="text" 
            className="search-input" 
            onChange={e => setQuery(e.target.value)} 
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-container">
          <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-container">
        <div className="temp">{Math.round(weather.main.temp)}°</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
