import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock, HardDrive, Home, Star } from "lucide-react";
function Button({
  icon,
  text,
  isActive,
}: {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}) {
  return (
    <button
      className={`flex flex-row gap-4 items-center rounded-full ${
        !isActive && "hover:bg-gray-200"
      } w-full text-start px-4 py-1.5 text-sm ${
        isActive ? "bg-blue-200" : "bg-transparent"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}
export default function SideBar() {
  const capacity = 40;
  const used = 10;
  return (
    <div className="flex flex-col w-full px-2">
      <Button text="Home" icon={<Home size={"18"} />} isActive={true} />
      <button className="flex flex-row gap-4 items-center rounded-full hover:bg-gray-200 w-full text-start px-4 py-1.5 text-sm">
        <HardDrive size={"18"} />
        My Drive
      </button>
      <Separator className="my-4" />
      <button className="flex flex-row gap-4 items-center rounded-full hover:bg-gray-200 w-full text-start px-4 py-1.5 text-sm">
        <Clock size={"18"} />
        Recent
      </button>
      <button className="flex flex-row gap-4 items-center rounded-full hover:bg-gray-200 w-full text-start px-4 py-1.5 text-sm">
        <Star size={"18"} />
        Starred
      </button>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2 px-4">
        <p className="text-sm text-gray-800">Storage Account</p>
        <Progress
          value={(used / capacity) * 100}
          className="h-1.5 bg-gray-300"
        />
        <p className="text-xs text-gray-700">
          {used} GB of {capacity} GB used
        </p>
      </div>
    </div>
  );
}
