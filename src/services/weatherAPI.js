// src/services/weatherAPI.js
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

export const fetchCurrentWeather = async (city, unit = 'metric') => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
  if (!res.ok) throw new Error('City not found');
  return await res.json();
};

export const fetchForecast = async (city, unit = 'metric') => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${unit}`);
  if (!res.ok) throw new Error('Forecast fetch failed');
  return await res.json();
};
