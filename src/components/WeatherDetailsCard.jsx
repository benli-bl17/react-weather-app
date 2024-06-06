import { Card, CardContent } from "@/components/ui/card";
import { GiWindsock } from "react-icons/gi";
import { RiWaterPercentLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineVisibility } from "react-icons/md";
import { FiSunrise, FiSunset } from "react-icons/fi";

function WeatherDetailsCard({ weather, unitSymbols }) {
  const { speed, humidity, pressure, visibility, sunrise, sunset } = weather;

  const details = [
    {
      id: 1,
      title: "Wind speed",
      Icon: GiWindsock,
      value: `${speed}  ${unitSymbols.speed}`,
    },
    {
      id: 2,
      title: "Humidity",
      Icon: RiWaterPercentLine,
      value: humidity,
    },
    {
      id: 3,
      title: "Pressure",
      Icon: AiOutlineDashboard,
      value: pressure,
    },
    {
      id: 4,
      title: "Visibility",
      Icon: MdOutlineVisibility,
      value: visibility,
    },
    {
      id: 5,
      title: "Sunrise",
      Icon: FiSunrise,
      value: sunrise,
    },
    {
      id: 6,
      title: "Sunset",
      Icon: FiSunset,
      value: sunset,
    },
  ];

  return (
    <Card className="flex flex-2 flex-wrap border-none shadow-none">
      {details.map(({ id, title, Icon, value }) => (
        <CardContent
          key={id}
          className="bg-primary-foreground flex m-1 items-center space-x-4 flex-1 py-3 rounded-sm"
        >
          <Icon size={30} className="ml-10" />
          <div className="flex flex-col flex-1">
            <p className="capitalize">{title}</p>
            <p>{value}</p>
          </div>
        </CardContent>
      ))}
    </Card>
  );
}

export default WeatherDetailsCard;
