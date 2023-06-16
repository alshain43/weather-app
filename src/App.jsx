import { useEffect, useState } from "react";
import "./App.css";
import { MdLocationOn, MdSearch } from "react-icons/md";
import { MdWater } from "react-icons/md";
import { TbWind } from "react-icons/tb";
import { getWeatherData } from "./components/Api";
import { BiLoaderCircle } from "react-icons/bi";

const App = () => {
  const [location, setLocation] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await getWeatherData(location);
    console.log(data);
    setWeatherData(data);
    setLoading(false);
  };

  useEffect(() => {
      getData();
  }, []);

  return (
    <div className="container">
      <div className="search-box">
        <MdLocationOn className="fs-1" />
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <button onClick={() => getData()}>
          <MdSearch />
        </button>
      </div>
      {loading ? (
        <div className="loader-container text-center">
          <BiLoaderCircle size={50} color={"#06283D"} loading={loading} />
        </div>
      ) : (
        <>
          {weatherData !== null ? (
            <div className="weather-box">
              <img
                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              />
              <p className="description">{weatherData.weather[0].main}</p>
              <p className="temperature">
                {parseFloat(weatherData.main.temp - 273.15).toFixed(1)}&deg;C
              </p>

              <div className="weather-details">
                <div className="humidity d-flex">
                  <MdWater className="me-2"/>
                  <div>
                    <span></span>
                    <p>Humidity:{weatherData.main.humidity}%</p>
                  </div>
                </div>
                <div className="wind d-flex ">
                  <TbWind className=" me-2"/>
                  <div>
                    <span></span>
                    <p>Wind Speed:{weatherData.wind.speed}km/h</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
