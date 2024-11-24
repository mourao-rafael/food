import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "../_components/product-image";
import RestaurantInfo from "../_components/restaurant-info";
import ProductPriceQuantity from "../_components/product-price-quantity";
import DeliveryCard from "../_components/delivery-card";
import ProductsList from "@/app/_components/products-list";
import ListTitle from "@/app/_components/list-title";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      restaurant: true,
    },
  });

  // Validate product:
  if (!product) {
    return notFound();
  }

  const otherProducts = await db.product.findMany({
    where: {
      restaurantId: product.restaurant.id,
      NOT: {
        id: product.id,
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  });


  return (
    <>
      {/* IMAGE: */}
      <ProductImage product={product} />

      {/* TITLE AND PRICE: */}
      <div className="p-5 relative mt-[-1.5rem] z-50 rounded-t-3xl bg-white">
        {/* RESTAURANT: */}
        <RestaurantInfo product={product} />

        {/* TITLE: */}
        <h1 className="font-semibold text-xl mb-3 mt-1">{product.name}</h1>

        {/* PRICE AND QUANTITY: */}
        <ProductPriceQuantity product={product} />

        <DeliveryCard restaurant={product.restaurant} className="my-6" />

        {/* PRODUCT DESCRIPTION: */}
        <div className="space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-base text-muted-foreground">{product.description}</p>
        </div>
      </div>

      {/* OTHER PRODUCTS: */}
      <div className="pb-3 space-y-2">
        <ListTitle title="Outros produtos" />
        <ProductsList products={otherProducts} />
      </div>
    </>
  )
};

export default ProductPage;
