import React from "react";
import s from "./InfoPage.module.scss";
import Container from "@/shared/components/Container/Container";

export interface InfoPageProps {
  title?: string;
}

export default function InfoPage({}: InfoPageProps) {
  return (
    <Container>
      <h1 className={s.title}>Privacy & Policy</h1>
      <p className={s.subtitle}>
        Your privacy is important to us. This page explains how we collect, use,
        and protect your personal information.
      </p>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Information Collection</h2>
        <p className={s.text}>
          We collect only the information necessary to provide our services,
          such as your name, email address, and delivery information.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Information Usage</h2>
        <p className={s.text}>
          Your information is used solely for processing orders, improving our
          services, and communicating with you regarding your purchases.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Security</h2>
        <p className={s.text}>
          We implement a variety of security measures to maintain the safety of
          your personal information.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>Contact Us</h2>
        <p className={s.text}>
          If you have any questions regarding our privacy policy, please contact
          us at:{" "}
          <a href="mailto:contact@shoes.com" className={s.link}>
            contact@shoes.com
          </a>
        </p>
      </section>

      <h1 className={s.title}>Terms of Service</h1>
      <p className={s.subtitle}>
        Welcome to our website. Please read the following terms and conditions
        carefully before using our services.
      </p>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>1. Introduction</h2>
        <p className={s.text}>
          By accessing or using our website, you agree to be bound by these
          Terms of Service and all applicable laws and regulations. If you do
          not agree with any of these terms, you are prohibited from using or
          accessing this site.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>2. Services Provided</h2>
        <p className={s.text}>
          We offer a wide range of fashion accessories and footwear. All
          purchases are subject to availability, and we reserve the right to
          limit or cancel quantities purchased per person, per household, or per
          order.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>3. User Responsibilities</h2>
        <p className={s.text}>
          You agree not to use the site for any unlawful purpose, or any purpose
          prohibited by these Terms. You are responsible for maintaining the
          confidentiality of your account and password.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>4. Intellectual Property</h2>
        <p className={s.text}>
          All content on this site, including text, graphics, logos, images, and
          software, is the property of Bagllet or its content suppliers and is
          protected by international copyright laws.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>5. Limitation of Liability</h2>
        <p className={s.text}>
          We do not warrant that the site will be error-free or uninterrupted.
          Under no circumstances shall Bagllet be liable for any damages arising
          from the use or inability to use the website.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>6. Changes to Terms</h2>
        <p className={s.text}>
          We reserve the right to update or modify these Terms at any time
          without prior notice. Your continued use of the site following any
          changes constitutes acceptance of those changes.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>7. Contact Information</h2>
        <p className={s.text}>
          If you have any questions about these Terms, please contact us at:{" "}
          <a href="mailto:contact@shoes.com" className={s.link}>
            contact@shoes.com
          </a>
        </p>
      </section>
    </Container>
  );
}
