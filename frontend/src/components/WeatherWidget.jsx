import React, { useState, useEffect } from "react";
import { fetchWeather } from "../services/api";
import WeatherCard from "../components/WeatherCard"
import { motion, AnimatePresence } from "framer-motion";


function WeatherWidget() {
  const [data, setData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Run only once when component mounts
  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather();
      // const weatherData = true;
      setData(weatherData);
    };

    getWeather();
  }, []); 

  const handleWeatherClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseWeather = () => {
    setIsFormOpen(false);
  };

  const icon = data && data.icon;
  return (
    <div style={isFormOpen ? styles.blurredContent : styles.content}>
      <button style={styles.weatherButton} onClick={handleWeatherClick}>
        <div>
          {data && (
            <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="Weather" style={{ width: 50, height: 50 }} />
          )}
        </div>
      </button>
  
      <AnimatePresence>
        {isFormOpen && data && (
          <WeatherCard onClose={handleCloseWeather} icon={data.icon} condition={data.condition} temperature={data.temperature} location={data.location} />
        )}
      </AnimatePresence>
    </div>
  );
}
const styles = {
  weatherButton: {
    backgroundColor: "#4a90e2"
  },
};

export default WeatherWidget;
