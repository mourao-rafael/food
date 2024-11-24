import { Prisma } from "@prisma/client";
import Image from "next/image";

interface RestaurantInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true,
    },
  }>;
}

const RestaurantInfo = ({ product }: RestaurantInfoProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative w-8 h-8">
        <Image
          src={product.restaurant.imageUrl}
          alt={product.restaurant.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span className="text-muted-foreground">{product.restaurant.name}</span>
    </div>
  )
};

export default RestaurantInfo;
