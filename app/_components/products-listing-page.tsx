import { Prisma } from "@prisma/client";
import Header from "./header";
import ProductItem from "./product-item";

interface ProductsListingPageProps {
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

const ProductsListingPage = ({ products }: ProductsListingPageProps) => {
  return (
    <div>
      <Header />
      <h2 className="text-lg font-semibold px-5 py-6">Produtos Recomendados</h2>
      <div className="grid grid-cols-2 px-5 gap-6">
        {
          products.map(product => (
            <ProductItem key={product.id} product={product} className="min-w-full" />
          ))
        }
      </div>
    </div>
  );
};

export default ProductsListingPage;
