import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export const calculateProductTotalPrice = (product: Product) => {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discount = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discount;
}

export const formatPrice = (price: number | Decimal) => {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(Number(price));
}