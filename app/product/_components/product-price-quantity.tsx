"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { calculateProductTotalPrice, formatPrice } from "@/app/_helpers/price";
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

interface ProductPriceQuantityProps {
  product: Product;
}

const ProductPriceQuantity = ({ product }: ProductPriceQuantityProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleClickButton = (action: 'add' | 'remove') => {
    setQuantity((action === 'add') ? quantity + 1 : quantity - 1);
  }


  return (
    <div className="flex justify-between">
      {/* PRICE: */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-xl">{formatPrice(calculateProductTotalPrice(product))}</h2>
          {product.discountPercentage > 0 && <DiscountBadge percentage={product.discountPercentage} />}
        </div>

        {/* ORIGINAL PRICE: */}
        {product.discountPercentage > 0 && (
          <span className="text-muted-foreground">De: {formatPrice(product.price)}</span>
        )}
      </div>

      {/* QUANTITY: */}
      <div className="flex items-center gap-3 text-center">
        <Button
          size="icon"
          onClick={() => handleClickButton("remove")}
          disabled={quantity === 1}
          className={quantity === 1 ? 'bg-transparent border border-muted-foreground' : ''}
        >
          <ChevronLeftIcon className={quantity === 1 ? "text-black" : "text-white"} />
        </Button>
        <span className="w-4">{quantity}</span>
        <Button
          size="icon"
          onClick={() => handleClickButton("add")}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div >
  )
};

export default ProductPriceQuantity;
