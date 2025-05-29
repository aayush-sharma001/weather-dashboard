import React, { useContext } from 'react';
import { WeatherProvider, WeatherContext } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import styles from '../src/styles/WeatherBackground.module.css';

const getGradientClass = (weatherMain, currentTime, sunrise, sunset) => {
  const isNight = currentTime < sunrise || currentTime > sunset;
  const weather = weatherMain?.toLowerCase() || '';

  if (weather.includes('clear')) return isNight ? 'bg-clear-night' : 'bg-clear-day';
  if (weather.includes('cloud')) return isNight ? 'bg-clouds-night' : 'bg-clouds-day';
  if (weather.includes('rain')) return isNight ? 'bg-rain-night' : 'bg-rain-day';
  if (weather.includes('snow')) return 'bg-snow';

  return isNight ? 'bg-default-night' : 'bg-default-day';
};

function MainApp() {
  const { error, weatherData } = useContext(WeatherContext);

  const weatherMain = weatherData?.weather?.[0]?.main;
  const dt = weatherData?.dt;
  const sunrise = weatherData?.sys?.sunrise;
  const sunset = weatherData?.sys?.sunset;

  const bgClass = weatherData
    ? getGradientClass(weatherMain, dt, sunrise, sunset)
    : 'bg-default-day';

  return (
    <>
      <div className={`${styles[bgClass]} ${styles.fullScreenBackground}`} />
      <div className={`${styles.contentContainer} ${styles[bgClass]}`}>
        <SearchBar />
        <ErrorMessage message={error} />
        <WeatherDisplay />
        <Forecast />
      </div>
    </>
  );
}

function App() {
  return (
    <WeatherProvider>
      <MainApp />
    </WeatherProvider>
  );
}

export default App;
