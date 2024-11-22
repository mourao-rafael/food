import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductsList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRight } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    }
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-3">
        <Search />
      </div>

      <div className="py-3">
        <CategoryList />
      </div>

      <Image
        src="/promo-banner-01.png"
        alt="Até 30% de desconto em pizzas."
        width={0}
        height={0}
        className="w-full h-auto px-5 py-3"
        sizes="100pw"
        quality={100}
      />

      <div className="py-3 space-y-2">
        <div className="px-5 flex items-center justify-between">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">
            Ver todos
            <ChevronRight />
          </Button>
        </div>
        <ProductsList products={products} />
      </div>
    </>
  );
};

export default Home;
