import Image from "next/image";

import s from "./ProductGallery.module.scss";
import { Product } from "@/types/product";

type ProductGalleryProps = {
  shoe: Product;
};

export default function ProductGallery({ shoe }: ProductGalleryProps) {
  return (
    <div className={s.imageContainer}>
      <Image src={shoe.imageUrl} alt={shoe.name} fill className={s.image} />
    </div>
  );
}
