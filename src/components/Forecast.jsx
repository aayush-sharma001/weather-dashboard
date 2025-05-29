import { useContext } from 'react';
import styles from '../styles/Forecast.module.css';
import { WeatherContext } from '../context/WeatherContext';

const Forecast = () => {
  const { forecastData: forecast, unit } = useContext(WeatherContext);


  if (!forecast || !forecast.list) return null;

  const dailyData = forecast.list.filter((entry) =>
    entry.dt_txt.includes('12:00:00')
  );

  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className={styles.forecastContainer}>
      <h3>5-Day Forecast</h3>
      <div className={styles.cards}>
        {dailyData.map((day, idx) => {
          const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });
          return (
            <div key={idx} className={styles.card}>
              <p>{date}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>{Math.round(day.main.temp)}{tempUnit}</p>
              <p>{day.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
