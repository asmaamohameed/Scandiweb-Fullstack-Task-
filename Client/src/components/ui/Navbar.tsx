import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import { useCart } from "../../context/cartContext";

interface Category {
  name: string;
}

const Navbar = ({ categories }: { categories: Category[] }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const {closeCart} = useCart();
  
  useEffect(() => {
    if(menuOpen){
      setMenuOpen(false);
    }
  },[location.pathname]);

  const renderLinks = (isMobile = false) =>
    categories.map((category: Category) => {
      const path = `/${category.name.toLowerCase()}`;
      const isActive =
        location.pathname === path ||
        (category.name === "all" && location.pathname === "/");
      return (
        <Link
          key={category.name}
          to={path}
          onClick={() => isMobile && setMenuOpen(false)} // close menu on mobile click
          data-testid={isActive ? "active-category-link" : "category-link"}
          className={`relative pb-2 block ${
            isActive
              ? "text-green-500 after:w-full after:bg-green-500"
              : "after:w-0 after:bg-transparent"
          } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all after:duration-300`}
        >
          {category.name.toUpperCase()}
        </Link>
      );
    });

  return (
    <nav className="relative">
      {/* Desktop nav */}
      <div className="hidden md:flex gap-6">{renderLinks()}</div>
      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-between">
        <button
          onClick={() => {setMenuOpen((prev) => !prev);
            closeCart(); 
          }}
          className="p-2 w-30 cursor-pointer"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 z-10 md:hidden">
          {renderLinks(true)}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
