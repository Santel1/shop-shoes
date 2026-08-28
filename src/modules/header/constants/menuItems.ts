export const getCatalogItems = (locale: string) => [
  { label: "Shoes", href: `/${locale}/catalog?category=shoes` },
  { label: "Bags", href: `/${locale}/catalog?category=bags` },
  { label: "Accessories", href: `/${locale}/catalog?category=accessories` },
  { label: "New Arrivals", href: `/${locale}/catalog?isNew=true` },
];

export const getCampaignsItems = (locale: string) => [
  { label: "Summer Sale", href: `/${locale}/campaigns/summer` },
  { label: "Black Friday", href: `/${locale}/campaigns/black-friday` },
  { label: "New Offers", href: `/${locale}/campaigns/offers` },
];
