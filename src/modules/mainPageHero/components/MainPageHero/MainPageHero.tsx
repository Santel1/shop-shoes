import React from "react";
import s from "./MainPageHero.module.scss";
import Link from "next/link";

export default function MainPageHero() {
  return (
    <section className={s.hero}>
      {/* HERO */}
      <div className={s.heroOverlay} />
      <video
        className={s.heroVideo}
        src="/videos/shoes.mp4"
        autoPlay
        muted
        loop
        playsInline
      >
        {/* <source
              src="/videos/hero-desktop.mp4"
              type="video/mp4"
              media="(min-width: 768px)"
            />
            <source
              src="/videos/hero-mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            /> */}
      </video>
      <div className={s.heroContent}>
        <h1 className={s.heroTitle}>Discover our new collection</h1>
        <p className={s.heroSubtitle}>Perfect model for you</p>
        <Link href="/en/catalog" className={s.heroButton}>
          Look our shoes
        </Link>
      </div>
    </section>
  );
}
