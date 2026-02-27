import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const navLinks = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-colors duration-300 ${
        scrolled ? "bg-background" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-6 md:gap-10">
        <h1 className="font-display text-primary text-3xl md:text-4xl tracking-wider cursor-pointer">
          MOVIEFLIX
        </h1>
        <ul className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <li
              key={link}
              className="text-sm text-secondary-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 text-foreground cursor-pointer hover:text-muted-foreground transition-colors" />
        <Bell className="w-5 h-5 text-foreground cursor-pointer hover:text-muted-foreground transition-colors hidden sm:block" />
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-8 rounded bg-primary" />
          <ChevronDown className="w-4 h-4 text-foreground" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
