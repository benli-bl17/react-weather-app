import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import {
  MdMyLocation,
  MdOutlineNightlight,
  MdOutlineLightMode,
} from "react-icons/md";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

function Header({ setUnits, setQuery }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  useEffect(() => {
    const units = isChecked ? "imperial" : "metric";
    setUnits(units);
  }, [isChecked, setUnits]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-center items-center space-x-3 pb-4 px-5">
      <Logo />
      <SearchBar setQuery={setQuery} />
      <div className="flex space-x-1 items-center">
        <p className="font-bold text-sm">°C</p>
        <Switch
          id="airplane-mode"
          checked={isChecked}
          onCheckedChange={setChecked}
        />
        <p className="font-bold text-sm">°F</p>
      </div>
      <Button variant="secondary">
        <MdMyLocation onClick={handleLocationClick} />
      </Button>
      <Button variant="secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? <MdOutlineNightlight /> : <MdOutlineLightMode />}
      </Button>
    </div>
  );
}

export default Header;
