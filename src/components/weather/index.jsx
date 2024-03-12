import Search from "../search";
import { useState, useEffect } from "react";
const API_KEY = process.env.API_KEY;

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error,setError]=useState(null)
  const API_KEY = "5fcc1b89c490b14769f697b09151e7bc";
  async function handleSearch() {
    fetchWeatherData(search);
  }
  async function fetchWeatherData(params) {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=${API_KEY}`
      );
      const data = await resp.json();
      setLoading(false);
      console.log(data, "res");
      if(data.code=404){
        setError(data.message)
        console.log(data.message,'message');
      }
      setWeatherData(data);
    } catch (error) {
      setLoading(false);
      console.log(error,'error');
    }
  }
  useEffect(() => {
    fetchWeatherData("malappuram");
  }, []);
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      ></Search>
      {search && search.length ? <p>{search}</p> : "king"}
      {!loading && !error? (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp"> {weatherData?.main?.temp}</div>

          {/* <div className="temp">{weatherData?Weather?.main}</div> */}
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ....</div>
      )}
      {error? <div>{error}</div>:null}
    </div>
  );
}
