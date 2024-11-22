import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-36 min-w-36">
      {/* IMAGE: */}
      <div className="relative h-36 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
        />

        {
          product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-primary px-1.5 py-0.5 rounded-full text-white flex items-center">
              <ArrowDownIcon size={12} />
              <span className="text-xs font-semibold">{product.discountPercentage}%</span>
            </div>
          )
        }
      </div>

      {/* PRODUCT DESCRIPTION: */}
      <div className="">
        <h2 className="text-sm truncate pt-1">{product.name}</h2>
        <div className="flex items-end gap-1">
          <h3 className="font-semibold">{formatPrice(calculateProductTotalPrice(product))}</h3>
          {
            product.discountPercentage > 0 && (
              <span className="line-through text-muted-foreground text-xs">
                {formatPrice(product.price)}
              </span>
            )
          }
        </div>

        <span className="text-muted-foreground text-xs block pt-1">{product.restaurant.name}</span>
      </div>
    </div>
  );
};

export default ProductItem;
