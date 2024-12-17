import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";

const RecommendedProductsPage = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    },
    take: 30,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      discountPercentage: "desc",
    },
  });

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

export default RecommendedProductsPage;
