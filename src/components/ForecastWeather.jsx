import WeatherSummaryCard from "./WeatherSummaryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ForecastWeather({ data, unitSymbols }) {
  // Extract unique dates from the data
  const dates = [...new Set(data.map((item) => item.date))];

  // Function to render WeatherSummaryCard components
  const renderWeatherCards = (weatherData) => {
    return weatherData.map((d, index) => (
      <WeatherSummaryCard
        key={index}
        temp={d.temp}
        date={d.date}
        time={d.time}
        icon={d.icon}
        description={d.description}
        unitSymbols={unitSymbols}
      />
    ));
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-2xl text-left">Next 5 Days</p>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All days</TabsTrigger>
          {dates.map((date, index) => (
            <TabsTrigger key={index} value={date}>
              {date}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderWeatherCards(data)}
          </div>
        </TabsContent>
        {dates.map((date, index) => {
          const selectedDateData = data.filter((item) => item.date === date);
          return (
            <TabsContent key={index} value={date}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderWeatherCards(selectedDateData)}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

export default ForecastWeather;
