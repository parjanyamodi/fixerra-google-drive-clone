"use client";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock, HardDrive, Home, Star } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
function Button({
  icon,
  text,
  isActive,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  href: string;
}) {
  const router = useRouter();
  return (
    <button
      className={`flex flex-row gap-4 items-center rounded-full ${
        !isActive && "hover:bg-gray-200"
      } w-full text-start px-4 py-1.5 text-sm ${
        isActive ? "bg-blue-200" : "bg-transparent"
      }`}
      onClick={() => {
        router.push(href);
      }}
    >
      {icon}
      {text}
    </button>
  );
}
export default function SideBar() {
  const capacity = 40;
  const used = 10;
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full px-2">
      <Button
        text="Home"
        icon={<Home size={"18"} />}
        isActive={pathname === "/"}
        href="/"
      />
      <Button
        text="My Drive"
        icon={<HardDrive size={"18"} />}
        isActive={pathname.includes("/my-drive")}
        href="/my-drive"
      />
      <Separator className="my-4" />
      <Button
        text="Recent"
        icon={<Clock size={"18"} />}
        isActive={pathname.includes("/recent")}
        href="/recent"
      />
      <Button
        text="Starred"
        icon={<Star size={"18"} />}
        isActive={pathname.includes("/starred")}
        href="/starred"
      />

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
