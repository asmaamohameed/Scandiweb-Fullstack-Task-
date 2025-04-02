import { useCart } from "../Context/CartContext";
import CartDropdown from "../Components/UI/CartDropdown";
import { ShoppingCart } from "lucide-react";
import Logo from "./Svgs/Logo";
import Navbar from "./UI/Navbar";

interface HeaderProps {
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isCartOpen, setIsCartOpen }) => {
  const { cart } = useCart();

  return (
    <header className="container max-w-[1400px] mx-auto p-6 flex items-center justify-between z-20">
      <Navbar />
      <Logo />

      {/* Cart Icon with Dropdown */}
      <div className="relative">
        <div
          className="relative cursor-pointer text-gray-600 hover:text-green-500"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart size={34} />
          {cart.length > 0 && (
            <span className="absolute top-2 -right-2 bg-black text-white text-xs rounded-full px-2 py-1">
              {cart.length}
            </span>
          )}
        </div>

        {/* Dropdown */}
        {isCartOpen && <CartDropdown />}
      </div>
    </header>
  );
};

export default Header;
