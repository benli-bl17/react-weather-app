import { DateTime } from "luxon";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, params) => {
  try {
    const url = new URL(infoType, BASE_URL);
    const response = await axios.get(url.toString(), {
      params: { ...params, appid: API_KEY },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          throw new Error("Bad Request: Please check the provided parameters");
        case 401:
          throw new Error("Unauthorized: API key is missing or invalid");
        case 404:
          throw new Error("Not Found: The requested city does not exist");
        default:
          throw new Error("Request failed");
      }
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Failed to send request");
    }
  }
};

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};

const iconURL = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrentData = (data) => {
  const {
    coord: { lat, lon },
    dt,
    main: { temp, feels_like, humidity, pressure },
    sys: { country, sunrise, sunset },
    timezone,
    visibility,
    weather,
    wind: { speed },
    name,
  } = data;
  const { description, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp: Number(temp.toFixed(1)),
    feels_like: Number(feels_like.toFixed(0)),
    humidity: `${humidity} %`,
    pressure: `${pressure} hPa`,
    sunrise: formatToLocalTime(sunrise, timezone, "HH:mm "),
    sunset: formatToLocalTime(sunset, timezone, "HH:mm "),
    visibility: `${visibility / 1000} km`,
    speed: `${speed.toFixed(0)}`,
    description,
    icon: iconURL(icon),
    formattedLocalTime,
    date: formatToLocalTime(dt, timezone, "dd LLL ccc "),
    dt,
    timezone,
    lat,
    lon,
    country,
    name,
  };
};

const formatForecastData = (secs, offset, data) => {
  //hourly
  const hourly = data
    .filter((d) => d.dt > secs)
    .slice(0, 5)
    .map((d) => ({
      temp: d.main.temp.toFixed(1),
      date: formatToLocalTime(d.dt, offset, "EEEE"),
      time: formatToLocalTime(d.dt, offset, "HH:mm"),
    }));

  //daily
  const daily = data.map((d) => ({
    temp: d.main.temp.toFixed(1),
    date: formatToLocalTime(d.dt, offset, "dd LLL ccc"),
    time: formatToLocalTime(d.dt, offset, "HH:mm"),
    icon: iconURL(d.weather[0].icon),
    description: d.weather[0].main,
  }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (params) => {
  const formattedCurrentWeatherData = await getWeatherData(
    "weather",
    params
  ).then((data) => formatCurrentData(data));

  const { dt, timezone, lat, lon } = formattedCurrentWeatherData;

  const formattedForecastWeatherData = await getWeatherData("forecast", {
    lat,
    lon,
    units: params.units,
  }).then((data) => formatForecastData(dt, timezone, data.list));

  return { ...formattedCurrentWeatherData, ...formattedForecastWeatherData };
};

export default getFormattedWeatherData;
