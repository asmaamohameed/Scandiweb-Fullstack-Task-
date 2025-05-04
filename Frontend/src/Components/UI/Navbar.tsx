import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../GraphQL/queries";
import Loading from "../Fallbacks/Loading";

interface Category {
  name: string;
}

const Nav: React.FC = () => {
  const location = useLocation();
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <Loading />;
  if (error)
    return <nav className="p-4 text-red-700">Categories failed to load.</nav>;

  return (
    <nav className="relative">
      <div className="hidden md:flex gap-6">
        {data.categories.map((category: Category) => {
          const path = `/${category.name.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <Link
              key={category.name}
              to={path}
              //data-testid={isActive ? "active-category-link" : "category-link"}
              className={`relative pb-2 ${
                isActive
                  ? "text-green-500 after:w-full after:bg-green-500"
                  : "after:w-0 after:bg-transparent"
              } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all after:duration-300`}
            >
              {category.name.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
