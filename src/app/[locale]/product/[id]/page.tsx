import { notFound } from "next/navigation";

import shoes from "@/shared/data/shoes.json";
import bags from "@/shared/data/bags.json";
import ProductPage from "@/modules/productPage/components/ProductPage/ProductPage";
import { Product } from "@/types/product";

const products: Product[] = [
  ...shoes.filter((product) => product.category === "shoes"),
  ...bags,
];

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    // return <div>Shoe not found</div>;
    notFound();
  }

  return <ProductPage data={product} />;
}

// "use client";
// import React, { use, useEffect, useMemo, useState } from "react";
// import data from "@/shared/data/shoes.json";
// import s from "./page.module.scss";
// import Image from "next/image";
// import Container from "@/shared/components/Container/Container";
// import { useCart } from "@/context/CartContext";
// import ColorSwatch from "@/shared/components/ColorSwatch/ColorSwatch";

// // export interface PageProps {}

// export default function Page({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params);
//   const { addToCart } = useCart();

//   const shoe = data.find((item) => item.id === id);
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedSize, setSelectedSize] = useState<number | null>(null);
//   const [showSelectionMessage, setShowSelectionMessage] = useState(false);

//   useEffect(() => {
//     setSelectedColor(shoe?.color?.[0] ?? "");
//     setSelectedSize(null);
//     setShowSelectionMessage(false);
//   }, [shoe?.id]);

//   useEffect(() => {
//     setSelectedSize(null);
//     setShowSelectionMessage(false);
//   }, [selectedColor]);

//   const availableColors = shoe?.color ?? [];
//   const availableSizes = shoe?.size ?? [];

//   const sizeGroups = useMemo(() => {
//     if (!shoe || !selectedColor) {
//       return { inStock: [], madeToOrder: [] };
//     }

//     const inStock: number[] = [];
//     const madeToOrder: number[] = [];

//     availableSizes.forEach((size) => {
//       const variant = shoe.variants.find(
//         (item) =>
//           item.colorVariant === selectedColor && item.sizeVariant === size,
//       );

//       if (variant && variant.stockVariant > 0) {
//         inStock.push(size);
//       } else {
//         madeToOrder.push(size);
//       }
//     });

//     return { inStock, madeToOrder };
//   }, [shoe, selectedColor, availableSizes]);

//   const selectedVariant = useMemo(() => {
//     if (!shoe || !selectedColor || selectedSize === null) return null;

//     return (
//       shoe.variants.find(
//         (variant) =>
//           variant.colorVariant === selectedColor &&
//           variant.sizeVariant === selectedSize,
//       ) ?? null
//     );
//   }, [shoe, selectedColor, selectedSize]);

//   const normalizeColorName = (color: string) =>
//     color.replace(/\s+/g, "").toLowerCase();

//   const isInStock = (selectedVariant?.stockVariant ?? 0) > 0;
//   const isMadeToOrder = !isInStock;

//   const deliveryText = useMemo(() => {
//     if (!selectedColor || selectedSize === null) return "";
//     if (isInStock) {
//       return "Отправка 1-2 рабочих дня";
//     }
//     return "Изготовление и отправка 5-9 рабочих дней";
//   }, [selectedColor, selectedSize, isInStock]);

//   const isAddDisabled = !selectedColor;

//   const handleAddToCart = () => {
//     if (!shoe) return;

//     if (selectedSize === null) {
//       setShowSelectionMessage(true);
//       return;
//     }

//     addToCart({
//       id: shoe.id,
//       category: shoe.category,
//       name: shoe.name,
//       price: shoe.price,
//       quantity: 1,
//       imageUrl: shoe.imageUrl,
//       description: shoe.description,
//       color: shoe.color,
//       size: shoe.size,
//       colorOptions: shoe.colorOptions ?? undefined,
//       selectedColor,
//       selectedSize,
//       idVariant:
//         selectedVariant?.idVariant ??
//         `${shoe.id}-${selectedColor}-${selectedSize}`,
//       stockVariant: selectedVariant?.stockVariant ?? 0,
//       madeToOrder: isMadeToOrder,
//       deliveryText,
//     });
//   };

//   if (!shoe) {
//     return <div className={s.error}>Shoe not found</div>;
//   }

//   return (
//     <Container>
//       <div className={s.container}>
//         <div className={s.imageContainer}>
//           <Image
//             src={shoe.imageUrl}
//             alt={shoe.name}
//             layout="fill"
//             objectFit="cover"
//             className={s.image}
//           />
//         </div>
//         <div className={s.infoContainer}>
//           <h1 className={s.name}>{shoe.name}</h1>
//           <p className={s.price}>${shoe.price.toFixed(2)}</p>
//           <div className={s.colors}>
//             <h3>Available Colors:</h3>
//             <div className={s.colorOptions}>
//               {availableColors.map((color) => {
//                 const colorOption = shoe.colorOptions?.find(
//                   (option) => option.name === color,
//                 );

//                 if (colorOption) {
//                   return (
//                     <ColorSwatch
//                       key={color}
//                       option={colorOption}
//                       selected={selectedColor === color}
//                       onSelect={(name) => setSelectedColor(name)}
//                       size={36}
//                     />
//                   );
//                 }

//                 return (
//                   <button
//                     key={color}
//                     type="button"
//                     className={`${s.colorBtn} ${
//                       selectedColor === color ? s.active : ""
//                     }`}
//                     onClick={() => setSelectedColor(color)}
//                     aria-label={`Select ${color}`}
//                     style={{ backgroundColor: normalizeColorName(color) }}
//                   />
//                 );
//               })}
//             </div>
//           </div>

//           <div className={s.sizes}>
//             <h3>Available Sizes:</h3>
//             {selectedColor && (
//               <>
//                 {sizeGroups.inStock.length > 0 && (
//                   <div className={s.sizeGroup}>
//                     <h4 className={s.sizeGroupTitle}>In stock</h4>
//                     <div className={s.sizeOptions}>
//                       {sizeGroups.inStock.map((size) => (
//                         <button
//                           key={size}
//                           type="button"
//                           className={`${s.sizeBtn} ${
//                             selectedSize === size ? s.active : ""
//                           }`}
//                           onClick={() => {
//                             setSelectedSize(size);
//                             setShowSelectionMessage(false);
//                           }}
//                         >
//                           {size}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {sizeGroups.madeToOrder.length > 0 && (
//                   <div className={s.sizeGroup}>
//                     <h4 className={s.sizeGroupTitle}>Made to order</h4>
//                     <div className={s.sizeOptions}>
//                       {sizeGroups.madeToOrder.map((size) => (
//                         <button
//                           key={size}
//                           type="button"
//                           className={`${s.sizeBtn} ${
//                             selectedSize === size ? s.active : ""
//                           }`}
//                           onClick={() => {
//                             setSelectedSize(size);
//                             setShowSelectionMessage(false);
//                           }}
//                         >
//                           {size}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {selectedColor && selectedSize !== null && (
//             <div className={s.deliveryInfo}>
//               <p className={s.deliveryText}>{deliveryText}</p>
//             </div>
//           )}

//           {showSelectionMessage && selectedSize === null && (
//             <div className={s.selectionMessage}>Please select a size</div>
//           )}

//           <button
//             className={`${s.addToCart} ${
//               selectedColor && selectedSize !== null ? s.active : ""
//             }`}
//             onClick={handleAddToCart}
//             disabled={isAddDisabled}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//       <div className={s.description}>
//         <h3>Description:</h3>
//         <p>{shoe.description}</p>
//       </div>
//     </Container>
//   );
// }
