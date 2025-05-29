import React, { useContext, useState } from 'react';
import styles from '../styles/SearchBar.module.css';
import { WeatherContext } from '../context/WeatherContext';

const SearchBar = () => {
  const { fetchWeather, toggleUnit, unit } = useContext(WeatherContext);
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      fetchWeather(input.trim());
      setInput('');
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
      </form>
      <div className={styles.buttonArea}>
        <button type="submit" onClick={handleSearch} className={styles.searchBtn}>Search</button>
        <button onClick={toggleUnit} className={styles.toggleUnit}>
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>

    </div>
  );
};

export default SearchBar;