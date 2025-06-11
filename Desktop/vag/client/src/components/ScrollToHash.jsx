// src/components/ScrollToHash.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  const isInitialLoad = useRef(true);
  const lastHash = useRef(hash);

  useEffect(() => {
    // Reset scroll position to top on page change (not hash change)
    if (pathname !== "/" || (!hash && !isInitialLoad.current)) {
      window.scrollTo({ top: 0, behavior: "auto" });
      isInitialLoad.current = false;
      return;
    }

    // Handle hash scrolling only if hash actually changed or on initial load with hash
    if (!hash || (hash === lastHash.current && !isInitialLoad.current)) {
      isInitialLoad.current = false;
      return;
    }

    lastHash.current = hash;

    const scrollToTarget = () => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        const headerHeight = 96; // Height of fixed header
        const elementPosition = el.offsetTop - headerHeight - 20; // Extra padding

        window.scrollTo({
          top: elementPosition,
          behavior: isInitialLoad.current ? "auto" : "smooth", // No smooth scroll on initial load
        });
      } else if (!isInitialLoad.current) {
        // Only retry if it's not initial load
        setTimeout(scrollToTarget, 200);
      }
    };

    // Delay for initial load, immediate for hash changes
    const delay = isInitialLoad.current ? 300 : 100;
    setTimeout(scrollToTarget, delay);

    isInitialLoad.current = false;
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
