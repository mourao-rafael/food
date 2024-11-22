import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      width={0}
      height={0}
      className="w-full h-auto px-5 py-3"
      sizes="100pw"
      quality={100}
      {...props}
    />
  )
};

export default PromoBanner;
