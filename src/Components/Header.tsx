import { ShoppingCart } from "lucide-react";
import Logo from "./Svgs/Logo";
import Navbar from "./UI/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container max-w-[1400px] mx-auto p-6 flex items-center justify-between">
      <Navbar />
      <Link className="cursor-pointer" to="/">
      <Logo />
      </Link>
      
      <div className="text-gray-600 cursor-pointer hover:text-green-500 cursor-pointer">
        <ShoppingCart size={24} />
      </div>
    </header>
  );
};

export default Header;
