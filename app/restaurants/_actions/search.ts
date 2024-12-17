"use server";

import { db } from "@/app/_lib/prisma";

export const searchRestaurants = async (search: string) => {
  const matches = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      }
    }
  });

  return matches;
}