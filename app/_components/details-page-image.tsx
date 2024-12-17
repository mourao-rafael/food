"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { ReactElement } from "react";
import { cn } from "../_lib/utils";

interface DetailsPageImageProps {
  src: string;
  alt: string;
  imgClassName?: string;
  childComponents?: ReactElement[];
}

const DetailsPageImage = ({ src, alt, imgClassName, childComponents }: DetailsPageImageProps) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.back();
  }

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100pw"
        className={cn("w-full h-auto max-h-[22.5rem] object-cover", imgClassName)}
      />

      <Button
        variant="secondary"
        className="absolute top-2 left-2 rounded-full bg-white text-foreground"
        size="icon"
        onClick={handleButtonClick}
      >
        <ChevronLeftIcon />
      </Button>

      {
        // Render child components:
        childComponents
      }
    </div>
  )
};

export default DetailsPageImage;
