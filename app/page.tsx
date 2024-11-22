import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <>
      <Header />

      <div className="px-5 py-3">
        <Search />
      </div>

      <CategoryList />

      <Image
        src="/promo-banner-01.png"
        alt="Até 30% de desconto em pizzas."
        width={0}
        height={0}
        className="w-full h-auto px-5 py-6"
        sizes="100pw"
        quality={100}
      />
    </>
  );
};

export default Home;
