import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

function Dashboard({ weather, unitSymbols }) {
  return (
    <div className=" container">
      <CurrentWeather unitSymbols={unitSymbols} weather={weather} />
      <ForecastWeather unitSymbols={unitSymbols} data={weather.daily} />
    </div>
  );
}

export default Dashboard;
