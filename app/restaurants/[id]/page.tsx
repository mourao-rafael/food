/* eslint-disable react/jsx-key */
import DeliveryCard from "@/app/_components/delivery-card";
import DetailsPageImage from "@/app/_components/details-page-image";
import FavRestaurantButton from "@/app/_components/fav-restaurant-button";
import { db } from "@/app/_lib/prisma";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import CategoriesList from "./_components/categories-list";
import ProductsList from "@/app/_components/products-list";
import { Prisma } from "@prisma/client";

interface RestaurantPageProps {
  params: {
    id: string;
  }
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
      products: {
        take: 10,
        include: {
          category: true,
          restaurant: {
            select: {
              name: true,
            },
          },
        }
      }
    }
  });

  if (!restaurant) {
    return notFound();
  }

  // Build categories list:
  type CategoryProductsList = {
    categoryName: string;
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

  function buildCategoriesList(): CategoryProductsList[] {
    const categoriesList = {} as any;

    restaurant?.products.forEach(product => {
      const category = product.category.name;
      if (!categoriesList[category]) categoriesList[category] = [];
      categoriesList[category].push(product)
    });

    return Object.keys(categoriesList).map((categoryName): CategoryProductsList => {
      return {
        categoryName: categoryName,
        products: categoriesList[categoryName]
      }
    })
  }

  const categoryProductsList = buildCategoriesList();


  return (
    <div>
      <DetailsPageImage
        src={restaurant.imageUrl}
        alt={restaurant.name}
        imgClassName="max-h-[13.5rem]"
        childComponents={[<FavRestaurantButton className="w-10 h-10" />]}
      />

      <div className="p-5 relative mt-[-1.5rem] z-50 rounded-t-3xl bg-white">
        {/* PAGE TITLE: */}
        <div className="flex justify-between items-center">
          {/* TITLE: */}
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-8 w-8">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            <h1 className="font-semibold text-xl">
              {restaurant.name}
            </h1>
          </div>

          {/* RATING BADGE: */}
          <div className="top-2 left-2 bg-foreground px-3 py-1 rounded-full flex items-center gap-1 text-white">
            <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
            <span className="text-sm font-semibold">5.0</span>
          </div>
        </div>

        {/* DELIVERY INFO: */}
        <div className="py-5">
          <DeliveryCard restaurant={restaurant} />
        </div>

        {/* CATEGORIES: */}
        <CategoriesList categories={restaurant.categories} />

        {/* PRODUCTS */}
        {
          categoryProductsList.map(item => (
            <div className="mt-6 space-y-4">
              <h2 className="font-semibold">{item.categoryName}</h2>
              <ProductsList products={item.products} className="px-0" />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default RestaurantPage;
