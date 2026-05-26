import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auraLogo from "../assets/aura.webp";
import { EqualApproximately } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isAboutActive = isHomePage && location.hash === "#about";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = () => {
    setIsCollapsed(false);
  };

  const navLinkClass = (isActive) => `nav-link${isActive ? " active" : ""}`;

  const scrollToPageTop = () => {
    closeNavbar();

    window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
  };

  const handleAboutClick = (event) => {
    closeNavbar();

    if (!isHomePage) return;

    event.preventDefault();
    navigate("/#about");
    window.setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }, 0);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={scrollToPageTop}>
            <img
              src={auraLogo}
              alt="aura_logo logo"
              className="img-fluid logo"
              
            />
          </Link>
          <button className="navbar-toggler ms-auto" type="button" onClick={toggleNavbar}>
            <span className="navbar-toggler-menu">
              <EqualApproximately size={30} />
            </span>
          </button>

          <div className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={navLinkClass(isHomePage && !isAboutActive)}
                  aria-current={isHomePage && !isAboutActive ? "page" : undefined}
                  to="/"
                  onClick={scrollToPageTop}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={navLinkClass(isAboutActive)}
                  aria-current={isAboutActive ? "page" : undefined}
                  to="/#about"
                  onClick={handleAboutClick}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={navLinkClass(location.pathname === "/features")}
                  aria-current={location.pathname === "/features" ? "page" : undefined}
                  to="/features"
                  onClick={scrollToPageTop}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={navLinkClass(location.pathname === "/developers")}
                  aria-current={location.pathname === "/developers" ? "page" : undefined}
                  to="/developers"
                  onClick={scrollToPageTop}
                >
                  Developers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link to="/signin" className="btn btn-cs header-btn" onClick={scrollToPageTop}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
