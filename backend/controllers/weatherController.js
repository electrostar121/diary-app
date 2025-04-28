import dotenv from "dotenv";

dotenv.config();

export const fetchWeather = async (location) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API}&units=imperial`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
            condition: data.weather[0].description, // Fix: Access the correct index
            temperature: data.main.temp, // Temperature in °F
            location: data.name // City name returned from API
        };
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return null; // Return a fallback value
    }
};