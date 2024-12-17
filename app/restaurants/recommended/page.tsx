import RestaurantsListingPage from "@/app/_components/restaurants-listing-page";
import { db } from "@/app/_lib/prisma";


const RecommendedRestaurantsPage = async () => {
  const restaurants = await db.restaurant.findMany({});

  return (
    <RestaurantsListingPage restaurants={restaurants} />
  )
};

export default RecommendedRestaurantsPage;
