"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, `name` | `imageUrl`>
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.back();
  }

  return (
    <div className="relative">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={0}
        height={0}
        sizes="100pw"
        className="w-full h-auto max-h-[22.5rem] object-cover"
      />

      <Button
        variant="secondary"
        className="absolute top-2 left-2 rounded-full bg-white text-foreground"
        size="icon"
        onClick={handleButtonClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  )
};

export default ProductImage;
