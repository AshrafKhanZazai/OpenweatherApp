import { useState, useEffect, useRef } from 'react';
import search_icon from "../Assets/search.jpg"
import clear_icon from "../Assets/clear.png"
// import cloud_icon from "../Assets/cloud.png"
// import drizzle_icon from "../Assets/drizzle.png"
// import rain_icon from "../Assets/rain.png"
// import snow_icon from "../Assets/snow.png"
// import wind_icon from "../Assets/wind.png"
import "../App.css"

const OpenWeather = () => {
const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('New York');
  const [apiKey, setApiKey] = useState('3f4024f91952fe5a8eefa002a50c8e62');

//   const allIcons = {
//     "01d" : clear_icon,
//     "01n" : clear_icon,
//     "02d" : cloud_icon,
//     "02n" : cloud_icon,
//     "03d" : drizzle_icon,
//     "03n" : drizzle_icon,
//     "04d" : rain_icon,
//     "04n" : rain_icon,
//     "09d" : snow_icon,
//     "09n" : snow_icon,
//     "10d" : wind_icon,
//     "10n" : wind_icon
//   }

  useEffect(() => {
      const fetchWeatherData = async () => {
          try {
              const response = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                const data = await response.json();
                setWeatherData(data);
                // const ships = allIcons[data.weatherData[0].icon] || clear_icon; 
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

fetchWeatherData();
}, [city, apiKey]);

  if (!weatherData) {
    return <div className='flex items-center justify-center' style={{fontSize: "25px", paddingTop: "300px", color: "red", fontWeight: "700"}}>Loading....</div>;
  }
  const timestamp = weatherData.sys.sunset;
  const date = new Date(timestamp * 1000).toLocaleString();

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  return (
    // <div>
    //   <h2>Weather Forecast for {weatherData.name}</h2>
    //   <p>Temperature: {weatherData.main.temp}°C</p>
    //   <p>Description: {weatherData.weather[0].description}</p>
    //   <p>Humidity: {weatherData.main.humidity}%</p>
    //   <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    // </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        <div className="flex w-full items-center space-x-2 md:w-1/3">
  <input
     ref={inputRef}
    className="flex h-10 w-100 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-b/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    type="email"
    
    placeholder="Search For City"
  />
  <img   
    className="h-14 w-14 SearchBtn"
    onClick={() => setCity(inputRef.current.value)}
    src={search_icon} 

    alt="search Icon" />
</div>

          <div className="font-bold text-xl">{weatherData.name}</div>
          <div className="text-sm text-gray-500">{date}</div>
          <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
           <img  style={{ width: '100rem', height: '170px' }} src={iconUrl} alt={weatherData.weather[0].description} />
          </div>
          <div className="flex flex-row items-center justify-center mt-6">
            <div className="font-medium text-6xl">{weatherData.main.temp}°C</div>
            <div className="flex flex-col items-center ml-6">
              <div>{weatherData.weather[0].description}</div>
              <div className="mt-1">
                <span className="text-sm">
                  <i className="far fa-long-arrow-up"></i>
                </span>
                <span className="text-sm font-light text-gray-500">{weatherData.main.temp_min}°C</span>
              </div>
              <div>
                <span className="text-sm">
                  <i className="far fa-long-arrow-down"></i>
                </span>
                <span className="text-sm font-light text-gray-500">{weatherData.main.temp_max}°C</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-6">
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Wind Speed</div>
              <div className="text-sm text-gray-500">{weatherData.wind.speed} m/s</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Humidity</div>
              <div className="text-sm text-gray-500">{weatherData.main.humidity}%</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium text-sm">Visibility</div>
              <div className="text-sm text-gray-500">{weatherData.visibility}</div>
            </div>
          </div>
        <h1 className='pt-5'><strong>Created by: </strong>Ashraf Khan Zazai</h1>
        </div>
      </div>
  );
};

export default OpenWeather