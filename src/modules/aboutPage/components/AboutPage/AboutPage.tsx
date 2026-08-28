import React from "react";
import s from "./AboutPage.module.scss";
import Container from "@/shared/components/Container/Container";
import Image from "next/image";

export interface AboutPageProps {
  title?: string;
}

export default function AboutPage({}: AboutPageProps) {
  return (
    <Container>
      <h1 className={s.title}>About Us</h1>

      {/* Section 1: Image Left, Text Right */}
      <div className={s.section}>
        <div className={s.imageContainer}>
          <Image
            src="/images/f1.jpg"
            alt="Handcrafted leather shoes"
            layout="fill"
            objectFit="cover"
            className={s.image}
          />
        </div>
        <div className={s.textContainer}>
          <h2>Handcrafted Excellence</h2>
          <p>
            At our workshop, we craft premium leather shoes and bags with
            unmatched dedication. Every product is made by hand, ensuring
            exceptional quality and attention to detail. Our passion for
            craftsmanship sets us apart in a world of mass production.
          </p>
        </div>
      </div>

      {/* Section 2: Text Left, Image Right */}
      <div className={s.section}>
        <div className={s.imageContainer}>
          <Image
            src="/images/f2.jpg"
            alt="Handcrafted leather bag"
            layout="fill"
            objectFit="cover"
            className={s.image}
          />
        </div>
        <div className={s.textContainer}>
          <h2>Creative Designs</h2>
          <p>
            We believe that every piece tells a story. Our designs blend
            timeless elegance with modern creativity, making our leather goods
            not just accessories but statements of individuality. Each stitch
            reflects our commitment to innovation and style.
          </p>
        </div>
      </div>

      {/* Section 3: Image Left, Text Right */}
      <div className={s.section}>
        <div className={s.imageContainer}>
          <Image
            src="/images/f4.jpg"
            alt="Leather craftsmanship"
            layout="fill"
            objectFit="cover"
            className={s.image}
          />
        </div>
        <div className={s.textContainer}>
          <h2>Quality Materials</h2>
          <p>
            We source only the finest leathers, chosen for their durability and
            natural beauty. Combined with our meticulous crafting process, this
            ensures that our products are built to last while maintaining their
            luxurious appeal over time.
          </p>
        </div>
      </div>

      {/* Section 4: Text Left, Image Right */}
      <div className={s.section}>
        <div className={s.imageContainer}>
          <Image
            src="/images/f5.jpg"
            alt="Artisan workshop"
            layout="fill"
            objectFit="cover"
            className={s.image}
          />
        </div>
        <div className={s.textContainer}>
          <h2>Our Legacy</h2>
          <p>
            With years of experience, our artisans bring heritage techniques to
            every piece. We are proud to create leather goods that are not only
            functional but also carry the essence of tradition, creativity, and
            unmatched quality.
          </p>
        </div>
      </div>
    </Container>
  );
}
