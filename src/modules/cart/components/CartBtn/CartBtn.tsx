import { useCart } from "@/context/CartContext";
import Icon from "@/shared/components/Icon/Icon";

import s from "./CartBtn.module.scss";
import clsx from "clsx";

interface CartBtnProps {
  onClick: () => void;
  className?: string;
}

export default function CartBtn({ onClick, className }: CartBtnProps) {
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button onClick={onClick} className={s.cartBtn}>
      <Icon iconName="icon-cart" className={clsx(s.cartIcon, className)} />
      {itemCount > 0 && <span className={s.cartCount}>{itemCount}</span>}
    </button>
  );
}
