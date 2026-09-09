"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import s from "./not-found.module.scss";
import Icon from "@/shared/components/Icon/Icon";

export default function NotFound() {
  const { locale } = useParams() as { locale: string };

  return (
    <main className={s.page}>
      <div className={s.content}>
        <div className={s.titleWrap}>
          <span className={`${s.star} ${s.starOne}`}>✦</span>
          <span className={`${s.star} ${s.starTwo}`}>✦</span>
          <span className={`${s.star} ${s.starThree}`}>✦</span>
          <h1 className={s.title} aria-label="404">
            <span>4</span>
            <span className={s.titleZero}>0</span>
            <span>4</span>
          </h1>
        </div>
        <div className={s.copy}>
          <h2>Page Not Found</h2>
        </div>
        <Link className={s.button} href={`/${locale}`}>
          <Icon iconName="icon-arrow-left-circle" className={s.arrow} />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
