import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../GraphQL/queries";
import Loading from "../Fallbacks/Loading";

interface Category {
  name: string;
}

const Nav: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <Loading />;
  if (error)
    return (
      <nav className="p-4 text-red-700">
        Categories failed to load.
      </nav>
    );

  return (
    <nav className="relative">
      <div className="hidden md:flex gap-6">
        {data.categories.map((category: Category) => (
          <NavLink
            key={category.name}
            to={`/${category.name.toLowerCase()}`}
            // Add data-testid to NavLink based on isActive
            data-testid={({ isActive }) =>
              isActive ? "active-category-link" : "category-link"
            }
            className={({ isActive }) => {
              const baseClass =
                "relative pb-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all after:duration-300";
              const activeStyles =
                "text-green-500 after:w-full after:bg-green-500";
              const inactiveStyles = "after:w-0 after:bg-transparent";

              return `${baseClass} ${isActive ? activeStyles : inactiveStyles}`;
            }}
          >
                {category.name.toUpperCase()}
              
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
