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
  }>[],
  pageTitle: string;
}

const ProductsListingPage = ({ products, pageTitle }: ProductsListingPageProps) => {
  return (
    <div>
      <Header />
      <h2 className="text-lg font-semibold px-5 py-6">{pageTitle}</h2>
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
