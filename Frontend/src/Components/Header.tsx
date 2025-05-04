import { useCart } from "../Context/CartContext";
import CartDropdown from "./Cart/CartDropdown";
import { ShoppingCart } from "lucide-react";
import Logo from "./Svgs/Logo";
import Navbar from "./UI/Navbar";

type Category = {
  name: string;
};

const Header = ({ categories }: { categories: Category[] }) => {
  const { cart, isCartOpen, setIsCartOpen } = useCart();


  return (
    <header className=" container max-w-[1400px] mx-auto p-6 flex items-center justify-between z-20">
      <Navbar categories={categories}/>
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
        {isCartOpen &&
        <>
        <div
            className="absolute top-20 inset-x-0 h-full bg-black opacity-25 z-50"
            onClick={() => setIsCartOpen(false)}
            data-testid="cart-overlay"
          ></div>
        <CartDropdown setIsCartOpen={setIsCartOpen} />
        </>
        
        }
    </header>
  );
};

export default Header;
