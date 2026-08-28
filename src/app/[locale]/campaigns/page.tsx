import React from "react";
import CampaignsPage from "@/modules/campaignsPage/components/CampaignsPage/CampaignsPage";

export default function Page({}) {
  const collections = [
    {
      season: "Winter 2024",
      image: "/images/m2.jpg",
      alt: "Winter 2024 Collection",
    },
    {
      season: "Spring 2024",
      image: "/images/m1.jpg",
      alt: "Spring 2024 Collection",
    },
    {
      season: "Summer 2024",
      image: "/images/m3.jpg",
      alt: "Summer 2024 Collection",
    },
    {
      season: "Fall 2024",
      image: "/images/m4.jpg",
      alt: "Fall 2024 Collection",
    },
    {
      season: "Winter 2025",
      image: "/images/m2.jpg",
      alt: "Winter 2025 Collection",
    },
    {
      season: "Spring 2025",
      image: "/images/m7.jpg",
      alt: "Spring 2025 Collection",
    },
  ];
  return (
    <>
      <CampaignsPage collections={collections} />
    </>
  );
}
