"use server";

import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  // Fetch categories:
  const categories = await db.category.findMany({});

  return (
    <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-3 py-3 px-5 min-w-full">
      {categories.map(category => <CategoryItem key={category.id} category={category} />)}
    </div>
  )
};

export default CategoryList;
