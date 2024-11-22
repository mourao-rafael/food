import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";

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
}

const ProductsList = async ({ products }: ProductsListProps) => {
  return (
    <div className="flex items-center overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
      {products.map(product => <ProductItem key={product.id} product={product} />)}
    </div>
  );
};

export default ProductsList;
