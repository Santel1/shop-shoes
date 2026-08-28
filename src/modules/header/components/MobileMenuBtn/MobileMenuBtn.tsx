import React from "react";
import Icon from "@/shared/components/Icon/Icon";
import s from "./MobileMenuBtn.module.scss";
import clsx from "clsx";

export interface MobileMenuBtnProps {
  visible: boolean;
  onClick: () => void;
  className?: string;
}

export default function MobileMenuBtn({
  visible,
  onClick,
  className,
}: MobileMenuBtnProps) {
  return (
    <button
      className={`${s.mobileMenuBtn} ${visible ? s.active : ""}`}
      onClick={onClick}
      aria-label={visible ? "Close menu" : "Open menu"}
    >
      <Icon
        className={clsx(
          visible ? s.mobileMenuClose : s.mobileMenuOpen,
          className,
        )}
        iconName={visible ? "icon-cross-line" : "icon-menu-burger"}
      />
    </button>
  );
}
