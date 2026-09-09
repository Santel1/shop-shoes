import s from "./ProductDelivery.module.scss";

type ProductDeliveryProps = {
  visible: boolean;
  text: string;
};

export default function ProductDelivery({
  visible,
  text,
}: ProductDeliveryProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className={s.deliveryInfo}>
      <p className={s.deliveryText}>{text}</p>
    </div>
  );
}
