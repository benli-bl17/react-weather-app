function WeatherSummaryCard({
  date,
  time,
  icon,
  temp,
  description,
  unitSymbols,
}) {
  return (
    <div className="text-foreground bg-primary-foreground  flex items-center w-auto shadow-md px-6 py-2 rounded-md ">
      <div className="flex flex-col">
        <p className="font-light text-nowrap ">{date}</p>
        <p>{time}</p>
      </div>

      <div className="flex items-center ml-auto">
        <img src={icon} alt="icon" className="size-16" />
        <div className="flex flex-col">
          <p className="font-medium">
            {temp}
            {unitSymbols.temp}
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherSummaryCard;
