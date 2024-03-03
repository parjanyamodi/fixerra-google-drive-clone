import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
export default function Settings() {
  const used = 10;
  const capacity = 40;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="aspect-square p-2 hover:bg-gray-300 rounded-full h-fit w-fit">
          <SettingsIcon className="p-0.5" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="items-center">
        <DrawerHeader className="w-full">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Customize app for your comfort.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col w-[50%] gap-8 py-4">
          <div className="flex flex-col px-8 gap-2">
            <p className="font-semibold">Storage</p>
            <Progress
              value={(used / capacity) * 100}
              className="h-1.5 bg-gray-300"
            />
            <p className="text-xs text-gray-700">
              {used} GB of {capacity} GB used
            </p>
          </div>
          <div className="flex flex-col px-8 gap-2">
            <p className="font-semibold">Start Page</p>
            <RadioGroup defaultValue="home">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mydrive" id="mydrive" />
                <Label htmlFor="mydrive">My Drive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recent" id="recent" />
                <Label htmlFor="recent">Recent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="starred" id="starred" />
                <Label htmlFor="starred">Starred</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DrawerFooter className="w-full">
          <Button>Save</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
