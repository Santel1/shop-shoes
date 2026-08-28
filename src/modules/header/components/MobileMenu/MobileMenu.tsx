'use client";';
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import { MenuItem } from "@/types/cart";
import s from "./MobileMenu.module.scss";
import Icon from "@/shared/components/Icon/Icon";

interface MobileMenuProps {
  data: MenuItem[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function MobileMenu({
  data,
  visible,
  setVisible,
}: MobileMenuProps) {
  const [opened, setOpened] = useState<string | null>(null);

  const handleToggleOpened = (id: string) => {
    setOpened((prev) => (prev === id ? null : id));
  };

  return (
    <div className={clsx(s.mobileMenu, visible && s.visible)}>
      <nav>
        <ul className={s.list}>
          {data.map((item) => (
            <li key={item.id}>
              {item.subMenu ? (
                <button
                  className={s.subMenuBtn}
                  onClick={() => handleToggleOpened(item.id)}
                  aria-expanded={opened === item.id}
                  aria-label={`Toggle ${item.text} submenu`}
                >
                  {item.text}
                  <Icon
                    iconName="icon-chevron-down"
                    className={clsx(
                      s.subMenuIcon,
                      opened === item.id && s.active,
                    )}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={s.link}
                  onClick={() => setVisible(false)}
                >
                  {item.text}
                </Link>
              )}
              {item.subMenu && (
                <div
                  className={clsx(s.dropdown, opened === item.id && s.isOpened)}
                >
                  <ul className={s.subList}>
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.href}
                          className={s.link}
                          onClick={() => setVisible(false)}
                        >
                          {subItem.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
