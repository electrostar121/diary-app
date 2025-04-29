import { fetchLocation } from "./api";

const getGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation is not supported by your browser.");
        }
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(
                    fetchLocation(position.coords.latitude, position.coords.longitude)
                );
            },
            (error) => {
                reject("Unable to retrieve your location.");
            }
        );
    });
};
  
export default getGeolocation;
  