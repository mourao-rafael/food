import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  }>,
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className={cn("w-36 min-w-36 space-y-2", className)}>
        {/* IMAGE: */}
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {/* DISCOUNT BADGE: */}
          {
            product.discountPercentage > 0 && <DiscountBadge percentage={product.discountPercentage} className="absolute" />
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
    </Link>
  );
};

export default ProductItem;
