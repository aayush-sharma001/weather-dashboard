import { useContext, useEffect, useState } from 'react';
import styles from '../styles/WeatherDisplay.module.css';
import { WeatherContext } from '../context/WeatherContext';

const WeatherDisplay = () => {
  const { weatherData, unit } = useContext(WeatherContext);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    if (!weatherData) return;

    const updateTime = () => {
      const localOffsetInMs = new Date().getTimezoneOffset() * 60000; // in ms
      const utcNow = Date.now() + localOffsetInMs; // UTC time in ms
      const cityTime = new Date(utcNow + weatherData.timezone * 1000); // city time

      const formattedTime = cityTime.toLocaleTimeString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      setLocalTime(formattedTime);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, [weatherData]);

  if (!weatherData) return null;

  const {
    name,
    sys,
    weather,
    main,
    wind,
  } = weatherData;

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.city}>{name}, {sys?.country}</h2>
          <p className={styles.date}>{localTime}</p>
        </div>
        <div className={styles.icon}>
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
            alt={weather[0].description}
          />
          <p>{weather[0].main}</p>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.temp}>{Math.round(main.temp)}{tempUnit}</div>
        <div className={styles.meta}>
          <p>Humidity: {main.humidity}%</p>
          <p>Wind: {wind.speed} {windUnit}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
