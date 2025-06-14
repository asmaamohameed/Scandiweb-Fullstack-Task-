import { useCart } from "../context/cartContext";
import CartDropdown from "./cart/CartDropdown";
import { ShoppingCart } from "lucide-react";
import Logo from "./svgs/Logo";
import Navbar from "./ui/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Category = {
  name: string;
};

const Header = ({ categories }: { categories: Category[] }) => {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const location = useLocation();
  // Lock scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartOpen]);
  // Close cart on route change
  useEffect(() => {
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  }, [location.pathname]);

  return (
    <header className=" container max-w-[1400px] mx-auto p-6 flex items-center justify-between z-20">
      <Navbar categories={categories} />
      <Logo />
      {/* Cart Icon with Dropdown */}
      <div className="relative">
        <div
          className="relative cursor-pointer text-gray-600 hover:text-green-500"
          onClick={() => setIsCartOpen(!isCartOpen)}
          data-testid="cart-btn"
        >
          <ShoppingCart size={34} />
          {cart.length > 0 && (
            <span className="absolute top-2 -right-2 bg-black text-white text-xs rounded-full px-2 py-1">
              {cart.length}
            </span>
          )}
        </div>
      </div>
      {/* Dropdown */}
      {isCartOpen && (
        <>
          <div
            className="fixed top-20 inset-x-0 h-full bg-black opacity-25 z-50"
            onClick={() => setIsCartOpen(false)}
            data-testid="cart-overlay"
            aria-modal="true"
          ></div>
          <CartDropdown setIsCartOpen={setIsCartOpen} />
        </>
      )}
    </header>
  );
};

export default Header;
