import dotenv from "dotenv";

dotenv.config();

export const fetchWeather = async (location = "Portland, US") => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API}&units=imperial`
        );

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Weather Data:",data.weather[0].description, data.weather[0].icon, data.main.temp, data.name);
        return {
            icon: data.weather[0].icon, // icon name
            condition: data.weather[0].description, // Fix: Access the correct index
            temperature: data.main.temp, // Temperature in °F
            location: data.name // City name returned from API
        };
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return null; // Return a fallback value
    }
};

export const getWeather = async(req, res) => {
    try{
        const { location } = req.body;
        const weatherData = await fetchWeather(location);
        res.status(200).json(weatherData);
    }catch(error){
        res.status(500).json({ message: "Server Error: Unable to fetch weather" });
    }
};