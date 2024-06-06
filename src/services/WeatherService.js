import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infoType, params) => {
  const url = new URL(infoType, BASE_URL);
  url.search = new URLSearchParams({ ...params, appid: API_KEY });

  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(" Please check the city name and try again.");
    }
    return res.json();
  });
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
