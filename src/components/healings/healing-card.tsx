import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HealingCardProps {
  healingId: string;
  date: string;
  time: string;
  coordinator: string;
  name: string;
  sessions: number;
  amount: string;
}

export function HealingCard({
  healingId,
  date,
  time,
  coordinator,
  name,
  sessions,
  amount,
}: HealingCardProps) {
  // Parse the date string
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleString("default", { month: "short" });
  const day = parsedDate.getDate();
  const weekday = parsedDate.toLocaleString("default", { weekday: "short" });

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm rounded-lg border-gray-200 p-6">
      {/* Top row with Healing ID */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-900">
          Healing ID: {healingId}
        </span>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Left column for Date */}
        <div className="flex flex-col items-center bg-gray-100 p-5 rounded-lg w-30">
          <span className="text-sm uppercase text-gray-500">{month}</span>
          <p className="text-3xl font-bold text-[#4ead91]">{day}</p>
          <span className="text-sm text-gray-600">{weekday}</span>
        </div>

        {/* Middle section - 2x2 grid */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Coordinator</span>
            <p className="text-sm font-medium text-gray-900">{coordinator}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Name</span>
            <p className="text-sm font-medium text-gray-900">{name}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">No. of Sessions</span>
            <p className="text-base font-semibold text-gray-900">{sessions}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Amount</span>
            <p className="text-base font-semibold text-[#4ead91]">
              Rs. {amount}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Left Button */}
      <div className="mt-6">
        <Button
          variant="outline"
          className="w-full border-[#4ead91] text-[#4ead91] hover:bg-[#4ead91] hover:text-white transition-colors"
        >
          View Detail
        </Button>
      </div>
    </Card>
  );
}

export default HealingCard;
