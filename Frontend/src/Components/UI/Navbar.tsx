import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../GraphQL/queries";
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons for mobile menu
import Loading from '../Loading';

interface Category {
  name: string;
}

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_CATEGORIES);


  if (loading) return <Loading />;  
  if (error) return <p>Error: {error.message}</p>;

  return (
    <nav className="relative">
      <div className="hidden md:flex gap-6">
        {data.categories.map((category: Category) => (
          <NavLink
            key={category.name}
            to={`/${category.name.toLowerCase()}`}
            className={({ isActive }) =>
              `relative pb-2 ${
                isActive
                  ? "text-green-500 after:w-full after:bg-green-500"
                  : "after:w-0 after:bg-transparent"
              } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all after:duration-300`
            }
          >
            {category.name.toUpperCase()}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl focus:outline-none cusour-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-full left-0 w-auto z-20 bg-white shadow-md p-4 flex flex-col gap-4  md:hidden ${
          isOpen ? "translate-y-5" : "-translate-y-[200%]"
        }`}
      >
        {data.categories.map((category: Category) => (
          <NavLink
            key={category.name}
            to={`/${category.name.toLowerCase()}`}
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg text-lg ${
                isActive ? "text-green-500 font-semibold bg-gray-100" : "text-gray-700"
              } transition-colors duration-300`
            }
            datatest-id={category.name}
            onClick={() => setIsOpen(false)}
          >
            {category.name.toUpperCase()}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
