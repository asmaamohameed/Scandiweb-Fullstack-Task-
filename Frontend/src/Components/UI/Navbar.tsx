import { Link, useLocation } from "react-router-dom";

interface Category {
  name: string;
}

const Navbar = ({ categories }: { categories: Category[] }) => {
  const location = useLocation();
  return (
    <nav className="relative">
      <div className="hidden md:flex gap-6">
        {categories.map((category: Category) => {
          const path = `/${category.name.toLowerCase()}`;
          const isActive = location.pathname === path || (category.name === 'all' && location.pathname === '/');
          
          return (
            <Link
              key={category.name}
              to={path}
              data-testid={isActive ? 'active-category-link' : 'category-link'}
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

export default Navbar ;
