import { Category } from "@prisma/client";

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  function CategoryItem(cat: Category) {
    return (
      <div key={cat.id} className="bg-[#F4F4F4] min-w-[10.6rem] py-1 rounded-lg text-center text-muted-foreground text-sm">
        {cat.name}
      </div>
    )
  }

  return (
    <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden">
      {categories.map(cat => CategoryItem(cat))}
    </div>
  );
};

export default CategoriesList;
