"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { MenuItem } from "@/types/cart";
import {
  getCatalogItems,
  getCampaignsItems,
} from "@/modules/header/constants/menuItems";
import s from "./MobileHeader.module.scss";
import Icon from "@/shared/components/Icon/Icon";
import CartBtn from "../../../cart/components/CartBtn/CartBtn";
import MobileMenu from "../MobileMenu/MobileMenu";
import Cart from "../../../cart/components/Cart/Cart";
import MobileMenuBtn from "../MobileMenuBtn/MobileMenuBtn";
import clsx from "clsx";

interface MobileHeaderProps {
  isScrolled: boolean;
  isNotHome: boolean;
}

export default function MobileHeader({
  isScrolled,
  isNotHome,
}: MobileHeaderProps) {
  const { locale } = useParams() as { locale: string };
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const catalogSubMenu = getCatalogItems(locale).map((item, index) => ({
    id: `catalog-${index}`,
    text: item.label,
    href: item.href,
  }));

  const campaignsSubMenu = getCampaignsItems(locale).map((item, index) => ({
    id: `campaigns-${index}`,
    text: item.label,
    href: item.href,
  }));

  const mobileMenuData: MenuItem[] = [
    {
      id: "catalog",
      text: "Catalog",
      href: `/${locale}/catalog`,
      subMenu: catalogSubMenu,
    },
    {
      id: "campaigns",
      text: "Campaigns",
      href: `/${locale}/campaigns`,
      subMenu: campaignsSubMenu,
    },
    { id: "info", text: "Info", href: `/${locale}/info` },
    { id: "about", text: "About", href: `/${locale}/about` },
    { id: "user", text: "User", href: `/${locale}/user` },
    { id: "basket", text: "Basket", href: `/${locale}/basket` },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen, isCartOpen, setIsMenuOpen]);

  return (
    <>
      <div
        className={clsx(
          s.mobileNavWrapper,
          isScrolled && s.isScrolled,
          isNotHome && s.isNotHome,
          isMenuOpen && s.menuOpen,
        )}
      >
        <MobileMenuBtn
          visible={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={isMenuOpen ? s.mobileMenuClose : s.menuIcon}
        />
        <Link
          href={`/${locale}/`}
          className={s.link}
          onClick={() => {
            if (isMenuOpen) {
              setIsMenuOpen(false);
            }
          }}
        >
          <Icon iconName="icon-logo" className={s.logo} />
        </Link>
        <CartBtn className={s.cartIcon} onClick={() => setIsCartOpen(true)} />
      </div>
      <MobileMenu
        data={mobileMenuData}
        visible={isMenuOpen}
        setVisible={setIsMenuOpen}
      />
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
}
