import { Card, CardContent } from "@/components/ui/card";
function Next15HoursTempCard({ data, unitSymbols }) {
  return (
    <Card className=" flex-1 bg-primary-foreground">
      <CardContent className="flex flex-col space-y-2 pb-0 my-6">
        {data.map(({ date, time, temp }) => {
          return (
            <div key={time} className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="font-light text-sm">{date}</p>
                <p className="text-sm">{time}</p>
              </div>
              <p className="font-medium">
                {temp}
                {unitSymbols.temp}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default Next15HoursTempCard;
