import Container from "@/shared/components/Container/Container";
import Image from "next/image";
import s from "./CampaignsPage.module.scss";
import React from "react";

export interface CampaignsPageProps {
  title?: string;
  collections: {
    season: string;
    image: string;
    alt: string;
  }[];
}

export default function CampaignsPage({ collections }: CampaignsPageProps) {
  return (
    <Container>
      <h1 className={s.title}>Our Collections</h1>
      <div className={s.collections}>
        {collections.map((collection, index) => (
          <div
            key={collection.season}
            className={`${s.section} ${
              index % 2 === 0 ? s.imageLeft : s.imageRight
            }`}
          >
            <div className={s.imageContainer}>
              <Image
                src={collection.image}
                alt={collection.alt}
                layout="fill"
                objectFit="cover"
                className={s.image}
              />
            </div>
            <div className={s.textContainer}>
              <h2 className={s.season}>{collection.season} Collection</h2>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
