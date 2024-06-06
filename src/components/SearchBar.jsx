import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

function SearchBar({ setQuery }) {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="relative flex min-w-[600px] text-foreground">
      <Input
        type="text"
        className="pl-10"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="search by city..."
      />
      <Button
        onClick={handleSearch}
        variant="secondary"
        className="w-32 absolute right-0"
      >
        Search
      </Button>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg">
        <CiSearch />
      </div>
    </div>
  );
}

export default SearchBar;
