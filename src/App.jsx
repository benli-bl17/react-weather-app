import Header from "@/components/Header";
import Dashboard from "./components/Dashboard";
import getFormattedWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "./components/ui/badge";

function App() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [cities, setCities] = useState(() => {
    const storedCities = localStorage.getItem("cities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  const unitSymbols =
    units === "metric"
      ? { temp: "°C", speed: "Meter/Sec" }
      : { temp: "°F", speed: "Miles/Hour" };

  const getWeather = async () => {
    if (query) {
      try {
        const data = await getFormattedWeatherData({ ...query, units });
        setWeather(data);
        if (query.q) {
          setCities((prevCities) => {
            const lowercaseCity = query.q.toLowerCase();
            const newCities = [...prevCities, lowercaseCity];
            const uniqueCities = Array.from(new Set(newCities)).slice(-6);
            localStorage.setItem("cities", JSON.stringify(uniqueCities));
            return uniqueCities;
          });
        }
      } catch (e) {
        toast({
          title: "Weather data loading failed.",
          description: e.message,
        });
      }
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className="container max-w-7xl transition-colors duration-500">
      <div className="flex my-4 space-x-3 justify-center capitalize cursor-pointer">
        {cities.map((city) => (
          <Badge
            key={city}
            className="h-7"
            onClick={() => setQuery({ q: city })}
          >
            {city}
          </Badge>
        ))}
      </div>

      <Header setQuery={setQuery} setCities={setCities} setUnits={setUnits} />
      {weather && <Dashboard unitSymbols={unitSymbols} weather={weather} />}
    </div>
  );
}

export default App;
