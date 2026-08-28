"use client";

import Link from "next/link";
import clsx from "clsx";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import s from "./DesktopNavLinks.module.scss";

import Icon from "@/shared/components/Icon/Icon";
import CartBtn from "../../../cart/components/CartBtn/CartBtn";

import {
  getCatalogItems,
  getCampaignsItems,
} from "@/modules/header/constants/menuItems";

interface DesktopNavLinksProps {
  setIsCartOpen: (open: boolean) => void;
  isScrolled: boolean;
  className?: string;
  isNotHome: boolean;
}

type SubMenuType = "catalog" | "campaigns" | null;

export default function DesktopNavLinks({
  isScrolled,
  setIsCartOpen,
  className,
  isNotHome,
}: DesktopNavLinksProps) {
  const { locale } = useParams() as { locale: string };

  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuType>(null);

  const catalogItems = getCatalogItems(locale);
  const campaignsItems = getCampaignsItems(locale);

  const openSubmenu = (type: Exclude<SubMenuType, null>) => {
    setActiveSubMenu(type);
  };

  const closeSubmenu = () => {
    setActiveSubMenu(null);
  };

  const submenuItems =
    activeSubMenu === "catalog"
      ? catalogItems
      : activeSubMenu === "campaigns"
        ? campaignsItems
        : [];

  return (
    <nav
      className={clsx(
        s.nav,
        className,
        isScrolled && s.isScrolled,
        isNotHome && s.isNotHome,
      )}
    >
      <div className={s.submenuArea} onMouseLeave={closeSubmenu}>
        <ul className={s.navListLeft}>
          <li
            className={s.navListItem}
            onMouseEnter={() => openSubmenu("catalog")}
          >
            <Link
              href={`/${locale}/catalog`}
              className={s.link}
              aria-haspopup="true"
              aria-expanded={activeSubMenu === "catalog"}
            >
              Catalog
            </Link>
          </li>

          <li
            className={s.navListItem}
            onMouseEnter={() => openSubmenu("campaigns")}
          >
            <Link
              href={`/${locale}/campaigns`}
              className={s.link}
              aria-haspopup="true"
              aria-expanded={activeSubMenu === "campaigns"}
            >
              Campaigns
            </Link>
          </li>
        </ul>

        <div className={clsx(s.submenuBackdrop, activeSubMenu && s.isOpen)}>
          <div className={s.submenuPanel}>
            <div className={s.submenuColumn} role="menu">
              {submenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={s.submenuLink}
                  role="menuitem"
                  onClick={closeSubmenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Link href={`/${locale}/`} className={s.logoLink} aria-label="Home">
        <Icon iconName="icon-logo" className={s.logoIcon} />
      </Link>

      <ul className={s.navListRight}>
        <li className={s.navListItem}>
          <Link href={`/${locale}/info`} className={s.link}>
            Info
          </Link>
        </li>

        <li className={s.navListItem}>
          <Link href={`/${locale}/about`} className={s.link}>
            About
          </Link>
        </li>

        <li className={s.navListItem}>
          <Link
            href={`/${locale}/user`}
            className={s.link}
            aria-label="User account"
          >
            <Icon iconName="icon-user" className={s.userIcon} />
          </Link>
        </li>

        <li className={s.navListItem}>
          <CartBtn className={s.cartIcon} onClick={() => setIsCartOpen(true)} />
        </li>
      </ul>
    </nav>
  );
}
