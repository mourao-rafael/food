import { Restaurant } from "@prisma/client";
import Header from "./header";
import RestaurantItem from "./restaurant-item";

interface RestaurantsListingPageProps {
  restaurants: Restaurant[];
}

const RestaurantsListingPage = ({ restaurants }: RestaurantsListingPageProps) => {
  return (
    <div>
      <Header />
      <h2 className="text-lg font-semibold px-5 py-6">Restaurantes Recomendados</h2>
      <div className="flex flex-col space-y-4 px-5 gap-6">
        {
          restaurants.map(restaurant => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} className="w-full max-w-[40rem]" />
          ))
        }
      </div>
    </div>
  );
};

export default RestaurantsListingPage;
