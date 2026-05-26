import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteScroll = () => {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    const scrollTimer = window.setTimeout(() => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));

        if (target) {
          target.scrollIntoView({ block: "start", behavior: "auto" });
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
