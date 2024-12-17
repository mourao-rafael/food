import { Card } from "@/app/_components/ui/card";
import { formatPrice } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { BikeIcon, TimerIcon } from "lucide-react";
import { cn } from "../_lib/utils";

interface DeliveryCardProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>;
  className?: string;
};

const DeliveryCard = ({ restaurant, className }: DeliveryCardProps) => {
  return (
    <Card className={cn("flex justify-around py-3", className)}>
      {/* DELIVERY TIME */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="">Entrega</span>
          <BikeIcon />
        </div>
        <b>{Number(restaurant.deliveryFee) > 0 ? formatPrice(restaurant.deliveryFee) : "Grátis"}</b>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="">Tempo</span>
          <TimerIcon />
        </div>
        <b>{restaurant.deliveryTimeMinutes} min</b>
      </div>
    </Card>
  );
};

export default DeliveryCard;
