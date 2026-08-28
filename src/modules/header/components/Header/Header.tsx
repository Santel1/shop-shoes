"use client";
import s from "./Header.module.scss";

import MobileHeader from "../MobileHeader/MobileHeader";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import DesktopNavLinks from "../DesktopNavLinks/DesktopNavLinks";
import Cart from "@/modules/cart/components/Cart/Cart";
import { useLockBodyScroll } from "@/shared/hooks/useBlockScroll";

export default function Header() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLockBodyScroll(isCartOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNotHome = pathname !== "/ua" && pathname !== "/en";

  return (
    <header className={clsx(s.header, scrolled && s.scrolled)}>
      <MobileHeader isScrolled={scrolled} isNotHome={isNotHome} />
      <DesktopNavLinks
        isScrolled={scrolled}
        setIsCartOpen={setIsCartOpen}
        isNotHome={isNotHome}
      />
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
}

// "use client";
// import s from "./Header.module.scss";

// import MobileHeader from "../MobileHeader/MobileHeader";
// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import DesktopNavLinks from "../DesktopNavLinks/DesktopNavLinks";
// import Cart from "@/modules/cart/components/Cart/Cart";
// import { useLockBodyScroll } from "@/shared/hooks/useBlockScroll";

// export default function Header() {
//   const pathname = usePathname();
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useLockBodyScroll(isCartOpen);
//   useEffect(() => {
//     // Скролл
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };
//     // Навешиваем слушатели
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled, isCartOpen]);

//   return (
//     <header className={clsx(s.header, scrolled && s.scrolled)}>
//       <MobileHeader
//         isScrolled={scrolled}
//         isNotHome={pathname !== "/ua" && pathname !== "/en"}
//       />
//       <DesktopNavLinks
//         isScrolled={scrolled}
//         setIsCartOpen={setIsCartOpen}
//         isNotHome={pathname !== "/ua" && pathname !== "/en"}
//       />
//       <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//     </header>
//   );
// }
