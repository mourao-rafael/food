import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[16.625rem] max-w-[16.625rem] space-y-2">
      <div className="w-full h-[8.5rem] relative">
        {/* IMAGE: */}
        <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover rounded-lg" />

        {/* RATING BADGE: */}
        <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
          <span className="text-xs font-semibold">5.0</span>
        </div>

        {/* FAV BUTTON: */}
        <Button size={"icon"} className="absolute top-2 right-2 bg-white/30 rounded-full h-8 w-8">
          <HeartIcon className="text-white fill-white" />
        </Button>
      </div>

      {/* RESTAURANT DESCRIPTION: */}
      <div>
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex items-center gap-3">
          {/* DELIVERY FEE: */}
          <div className="flex gap-1">
            <BikeIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {
                Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatPrice(restaurant.deliveryFee)
              }
            </span>
          </div>

          {/* DELIVERY TIME: */}
          <div className="flex gap-1">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RestaurantItem;