import React from "react";
import s from "./Footer.module.scss";
import Icon from "@/shared/components/Icon/Icon";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.top}>
          <div className={s.brand}>
            <Link href="/en/" className={s.logoLink}>
              <Icon iconName="icon-logo" className={s.logo} />
            </Link>

            <p className={s.description}>
              Premium shoes for every occasion. Quality, comfort and style.
            </p>

            <div className={s.socials}>
              <a href="#" aria-label="Instagram">
                <Icon iconName="icon-instagram" />
              </a>

              <a href="#" aria-label="Facebook">
                <Icon iconName="icon-facebook" />
              </a>
            </div>
          </div>

          <nav className={s.navigation}>
            <div className={s.column}>
              <h3>Customer Service</h3>

              <ul>
                <li>
                  <Link href="#">Payment & Delivery</Link>
                </li>
                <li>
                  <Link href="#">Exchange & Return</Link>
                </li>
                <li>
                  <Link href="#">FAQ</Link>
                </li>
                <li>
                  <Link href="#">Corporate Orders</Link>
                </li>
              </ul>
            </div>

            <div className={s.column}>
              <h3>Information</h3>

              <ul>
                <li>
                  <Link href="#">About us</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            <div className={s.column}>
              <h3>Contact</h3>

              <address>
                <a href="tel:+491111111111">+49 111 1111111</a>

                <a href="mailto:contact@shoes.com">contact@shoes.com</a>

                <span>Mon-Fri: 09:00 - 18:00</span>
              </address>
            </div>
          </nav>
        </div>

        <div className={s.bottom}>
          <p>© {new Date().getFullYear()} Shoes. All rights reserved.</p>

          <ul className={s.payment}>
            <li>
              <Icon iconName="icon-visa" />
            </li>

            <li>
              <Icon iconName="icon-mastercard" />
            </li>

            <li>
              <Icon iconName="icon-paypal" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
