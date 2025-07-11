import axios from "axios";
import { getAuthToken } from "../utils/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchEntries() {
  const response = await api.get("/diary");
  return response.data;
}

export async function createEntry(entry) {
  console.log(entry);
  const response = await api.post("/diary", entry);
  return response.data;
}

/**
 * Fetch the current weather with the openWeather API
 */
export async function fetchWeather(location) {
  const response = await api.get("/weather", {
    params: {
      location: location
    }
  });
  return response.data;
}

export async function fetchLocation(lat, lon) {
  const response = await api.get("/weather/location", {
    params: {
      lat: lat,
      lon: lon,
    },
  });
  return response.data;
}

export async function updateEntry(entry) {
  const response = await api.put(`/diary/${entry._id}`,entry);
  console.log(response.data)
  return response.data;
}

export async function deleteEntry(entry) {
  const response = await api.delete(`/diary/${entry._id}`,entry);
  console.log(response.data)
  return response.data;
}
export default api;
