import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "13d3b92fe41e377e425524e32d314268";

export const getWeatherData = async (cityname) => {
  const { data } = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
  return data;
};
