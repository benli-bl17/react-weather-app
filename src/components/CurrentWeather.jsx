import Next15HoursTempCard from "./Next15HoursTempCard";
import WeatherCard from "./WeatherCard";
import WeatherDetailsCard from "./WeatherDetailsCard";

function CurrentWeather({ weather, unitSymbols }) {
  const { formattedLocalTime } = weather;
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-left ">Today Overview</p>
        <p>{formattedLocalTime}</p>
      </div>

      <div className="flex space-x-2">
        <WeatherCard unitSymbols={unitSymbols} weather={weather} />
        <WeatherDetailsCard unitSymbols={unitSymbols} weather={weather} />
        <Next15HoursTempCard unitSymbols={unitSymbols} data={weather.hourly} />
      </div>
    </div>
  );
}

export default CurrentWeather;
