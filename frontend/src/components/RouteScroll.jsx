import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollToTarget = (target) => {
  const header = document.querySelector(".header");
  const headerOffset = header ? header.getBoundingClientRect().height + 24 : 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(targetTop - headerOffset, 0),
    left: 0,
    behavior: "auto",
  });
};

const RouteScroll = () => {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    const scrollTimer = window.setTimeout(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));

        if (target) {
          scrollToTarget(target);
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);

    return () => window.clearTimeout(scrollTimer);
  }, [pathname, hash, key]);

  return null;
};

export default RouteScroll;
