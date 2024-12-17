import ProductsListingPage from "@/app/_components/products-listing-page";
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
    <ProductsListingPage products={products} pageTitle={category.name} />
  );
};

export default CategoryProductsPage;
