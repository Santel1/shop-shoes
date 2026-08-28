import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useCart } from "@/context/CartContext";
import s from "./Cart.module.scss";
import Icon from "@/shared/components/Icon/Icon";

interface CartProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Cart({ isOpen, setIsOpen }: CartProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div
        className={clsx(s.overlay, isOpen && s.visible)}
        onClick={() => setIsOpen(false)}
      />
      <div className={clsx(s.cartWrapper, isOpen && s.visible)}>
        <button onClick={() => setIsOpen(false)} className={s.closeBtn}>
          <Icon iconName="icon-cross-line" className={s.closeIcon} />
        </button>
        <p className={s.cartTitle}>Cart</p>
        {cart.items.length > 0 ? (
          <>
            <ul className={s.cartList}>
              {cart.items.map((item) => {
                const cartKey = item.idVariant ?? item.id;
                const cartId = item.idVariant ?? item.id;
                return (
                  <li key={cartKey} className={s.cartItem}>
                    <Image
                      alt={item.name}
                      width={150}
                      height={150}
                      src={item.imageUrl}
                      className={s.cartItemImage}
                    />
                    <div className={s.cartItemDetails}>
                      <h3 className={s.cartItemName}>{item.name}</h3>
                      <div className={s.colorRow}>
                        Color:
                        <div
                          className={s.swatchCircle}
                          style={(() => {
                            const name = item.selectedColor ?? item.color[0];
                            const option = item.colorOptions?.find(
                              (o) => o.name === name,
                            );
                            if (option) {
                              if ((option.type ?? "") === "solid") {
                                return { backgroundColor: option.value };
                              }
                              return {
                                backgroundImage: `url(${option.value})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              };
                            }
                            const simpleColor = name
                              .replace(/\s+/g, "")
                              .toLowerCase();
                            return { backgroundColor: simpleColor };
                          })()}
                        />
                        <p className={s.colorLabel}>
                          {(() => {
                            const name = item.selectedColor ?? item.color[0];
                            const option = item.colorOptions?.find(
                              (o) => o.name === name,
                            );
                            const label = option?.label ?? name;
                            return (
                              label.charAt(0).toUpperCase() + label.slice(1)
                            );
                          })()}
                        </p>
                      </div>
                      <p className={s.cartItemColor}>
                        Size: {item.selectedSize ?? item.size[0]}
                      </p>
                      <div className={s.cartItemInfo}>
                        <div className={s.counter}>
                          <button
                            className={s.counterBtn}
                            onClick={() =>
                              updateQuantity(cartId, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <p className={s.cartItemQuantity}>{item.quantity}</p>
                          <button
                            className={s.counterBtn}
                            onClick={() =>
                              updateQuantity(cartId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <p className={s.cartItemPrice}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button
                        className={s.cartItemRemoveBtn}
                        onClick={() => removeFromCart(cartId)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={s.cartSummaryWrapper}>
              <div className={s.cartSummary}>
                <p className={s.totalLabel}>Total:</p>
                <p className={s.totalPrice}>${totalPrice.toFixed(2)}</p>
              </div>
              <p className={s.cartMessage}>Ready to complete your purchase?</p>
              <div className={s.cartActions}>
                <Link href="/en/cart" className={s.cartLink}>
                  Go to cart
                </Link>
                <Link href="/en/checkout" className={s.cartLink}>
                  Checkout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p className={s.emptyCart}>Cart is empty</p>
        )}
      </div>
    </>
  );
}
