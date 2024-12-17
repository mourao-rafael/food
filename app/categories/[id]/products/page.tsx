import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoryProductsPageProps {
  params: {
    id: string;
  }
}

const CategoryProductsPage = async ({ params: { id } }: CategoryProductsPageProps) => {
  // Fetch products: 
  const products = await db.product.findMany({
    where: {
      categoryId: id
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    }
  });

  const category = await db.category.findUnique({ where: { id } });

  if (!category) {
    return notFound();
  }

  return (
    <div>
      <Header />
      <h2 className="text-lg font-semibold px-5 py-6">{category.name}</h2>
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

export default CategoryProductsPage;
