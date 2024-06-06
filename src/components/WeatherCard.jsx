import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiLocationOn } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";

function WeatherCard({ weather, unitSymbols }) {
  const { icon, description, temp, date, name, country, feels_like } = weather;

  return (
    <Card className=" flex-1 bg-primary-foreground">
      <CardHeader>
        <CardTitle>
          <img src={`${icon}`} alt="icon" />
          <p>
            {temp}
            {unitSymbols.temp}
          </p>
        </CardTitle>
        <CardDescription className="capitalize space-y-1 flex-col flex">
          <span className="">
            RealFeel {feels_like}
            {unitSymbols.temp}
          </span>
          <span>{description}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <hr className="my-2" />
        <div className="flex items-center space-x-1 my-1">
          <CiLocationOn />
          <p>
            {name}, {country}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <CiCalendarDate />
          <p>{date}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
