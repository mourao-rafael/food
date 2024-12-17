import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../_lib/utils";

interface FavRestaurantButtonProps {
  className?: string;
}

const FavRestaurantButton = ({ className }: FavRestaurantButtonProps) => {
  return (
    <Button size={"icon"} className={cn("absolute top-2 right-2 bg-gray-700 rounded-full h-7 w-7", className)}>
      <HeartIcon className="text-white fill-white" />
    </Button>
  )
};

export default FavRestaurantButton;
