import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";
import { cn } from "../_lib/utils";

interface ProductsListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  }>[];
  className?: string;
}

const ProductsList = async ({ products, className }: ProductsListProps) => {
  return (
    <div className={cn("flex items-center overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5", className)}>
      {products.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  );
};

export default ProductsList;
