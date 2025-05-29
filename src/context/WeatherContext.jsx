import { createContext, useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem('lastCity') || 'Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');

  const fetchWeather = async (cityName = city) => {
    try {
      setError('');

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const weatherJson = await weatherRes.json();
      if (weatherJson.cod !== 200) throw new Error(weatherJson.message);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const forecastJson = await forecastRes.json();
      if (forecastJson.cod !== "200") throw new Error(forecastJson.message);

      setWeatherData(weatherJson);
      setForecastData(forecastJson);
      setCity(cityName);
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (!city) return;
    fetchWeather(city);
    const interval = setInterval(() => {
      fetchWeather(city);
    }, 30000);
    return () => clearInterval(interval);
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <WeatherContext.Provider value={{
      city,
      weatherData,
      forecastData,
      error,
      fetchWeather,
      toggleUnit,
      unit,
      lastSearchedCity: city
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
