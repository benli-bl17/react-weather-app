import { TiWeatherCloudy } from "react-icons/ti";
import { Button } from "./ui/button";

function Logo() {
  return (
    <Button
      variant="secondary"
      className="flex items-center space-x-2 text-lg  "
    >
      <TiWeatherCloudy />
      <p>weather</p>
    </Button>
  );
}

export default Logo;
