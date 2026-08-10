"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button once user has scrolled past 350px (scrolled away from hero section)
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label="Scroll to top"
          data-cursor="hover"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 focus:outline-none transition-transform active:scale-95 cursor-pointer"
          style={{
            backgroundImage: "url('/images/button.png')",
            backgroundSize: "200% 100%",
            backgroundPosition: isHovered ? "100% 0%" : "0% 0%",
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
          }}
        />
      )}
    </AnimatePresence>
  );
}
