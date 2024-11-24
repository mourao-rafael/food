import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatPrice } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

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
    <Link href={`/product/${product.id}`}>
      <div className="w-36 min-w-36 space-y-2">
        {/* IMAGE: */}
        <div className="relative h-36 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
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
