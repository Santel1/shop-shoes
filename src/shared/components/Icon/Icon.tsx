import clsx from "clsx";
import s from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  className?: string;
}

const Icon = ({ iconName, className, ...props }: IconProps) => {
  const iconClass = clsx(s["icon"], className && className);
  return (
    <svg className={iconClass} {...props}>
      <use href={`/icons/sprite.svg#${iconName}`}></use>
    </svg>
  );
};

export default Icon;
