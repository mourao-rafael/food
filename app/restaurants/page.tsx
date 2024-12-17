"use client";

import { notFound, useSearchParams } from "next/navigation";
import RestaurantsListingPage from "../_components/restaurants-listing-page";
import { useEffect, useState } from "react";
import { searchRestaurants } from "./_actions/search";
import { Restaurant } from "@prisma/client";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();

  // Fetch restaurants:
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      searchRestaurants(search).then(foundRestaurants => setRestaurants(foundRestaurants));
    }
  }, [searchParams]);

  if (!searchParams.get("search")) {
    return notFound();
  }

  return (
    <RestaurantsListingPage restaurants={restaurants} pageTitle="Restaurantes Encontrados" />
  );
};

export default RestaurantsPage;
