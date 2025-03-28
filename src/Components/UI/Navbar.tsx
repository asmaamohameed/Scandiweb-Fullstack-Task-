import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../GraphQL/queries";
import localdata from "../../data.json";

const Nav = () => {
  // Try fetching categories from GraphQL
  const { data } = useQuery(GET_CATEGORIES, { skip: !GET_CATEGORIES });

  // Use local data if there's no backend response
  const categories = data?.categories || localdata.data.categories;

  return (
    <nav className="flex gap-6">
      {categories.map((category: { name: string }) => (
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
    </nav>
  );
};

export default Nav;
