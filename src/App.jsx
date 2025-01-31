import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [tcity, setTcity] = useState('');
  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [tempValue, setTempValue] = useState(null);


  const backgrounds = {
    hot: "url('https://cdn.pixabay.com/photo/2017/02/22/20/02/village-2090495_1280.jpg')",
    cloudy: "url('https://media.istockphoto.com/id/184103864/photo/clouds-on-sky.jpg?s=612x612&w=0&k=20&c=3JGI13B8xwZIObLtl8IN1VFtPErHv2pKiWV0tTuemsI=')",
    rainy: "url('https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=')",
    cold: "url('https://media.istockphoto.com/id/1360408960/vector/realistic-starry-night-sky-galaxy-background-abstract-constellation-background-with-nebula.jpg?s=612x612&w=0&k=20&c=jRiMFd_-cW1i1eKvSDbNEpR6pf2xiwtIorKjV4N3z0k=')",
  };

  const checkWeather = async () => {
    if (!city) {
      alert('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=91723d95d3d74f1f9cf90825253101&q=${city}`
      );

      const data = response.data;
      const temp = data.current.temp_c; 

      setIcon(`https:${data.current.condition.icon}`);
      setTemperature(`Temperature: ${temp}°C`);
      setWind(`Wind Speed: ${data.current.wind_kph} km/hr`);
      setHumidity(`Humidity: ${data.current.humidity}%`);
      setTcity(city);
      setTempValue(temp); 
      setCity('');
    } catch (error) {
      alert('Error fetching weather data. Please check the city name.');
      console.error('Weather API Error:', error);
    }
  };


  const getBackground = () => {
    if (tempValue >= 30) return backgrounds.hot;
    if (tempValue >= 20) return backgrounds.cloudy;
    if (tempValue >= 10) return backgrounds.rainy;
    return backgrounds.cold;
  };

  return (
    <div className="screen" style={{ backgroundImage: getBackground() }}>
      <div className="main">
        <div className="weather">
          <h1>Weather App</h1>

          <input
            placeholder="Search for your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={checkWeather}>Check Weather</button>

          {tcity && (
            <>
              <h1>{tcity}</h1>
              <img src={icon} alt="Weather Icon" width="120" />
              <h2>{temperature}</h2>
              <h2>{wind}</h2>
              <h2>{humidity}</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
