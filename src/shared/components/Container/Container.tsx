import s from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
