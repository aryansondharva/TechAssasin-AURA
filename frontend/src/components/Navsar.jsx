import { useLocation } from "react-router-dom";
import Header from "./Header";

const navbarRoutes = new Set(["/", "/features", "/developers", "/signin"]);

const Navsar = () => {
  const { pathname } = useLocation();

  if (!navbarRoutes.has(pathname)) return null;

  return <Header />;
};

export default Navsar;
