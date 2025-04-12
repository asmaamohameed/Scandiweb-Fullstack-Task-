import localdata from "../data.json";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";

const CategoryPage = ({ category }: { category: string }) => {
  const { addToCart } = useCart();

  const filteredProducts = localdata.data.products.filter(
    (product) => product.category.toUpperCase() === category.toUpperCase()
  );

  return (
    <div className="container  max-w-[1400px] mx-auto px-4 md:px-6 py-8 ">
      <h1 className="text-3xl font-semibold mb-8 capitalize">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 h-1/3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-[386px] w-full h-[444px] mx-auto shadow-none group overflow-hidden
             border-15 border-transparent transition-all duration-300 hover:border-white-500 hover:shadow-[0_6px_20px_#A8ACB030] hover:cursor-pointer"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`} key={product.id}>
                  <img
                    src={product.gallery[0]}
                    alt={product.name}
                    className={`object-cover w-full h-[330px] transition-opacity duration-300 ${
                      !product.inStock ? "opacity-50" : ""
                    }`}
                  />
                </Link>
                {!product.inStock && (
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-500 font-bold px-4 py-1">
                    OUT OF STOCK
                  </p>
                )}
              </div>
              <p className="mt-2 text-lg font-medium">{product.name}</p>
              <p className="mt-2 font-bold text-lg">
                ${product.prices[0].amount}
              </p>
              <div className="absolute bottom-18 md:bottom-26 lg:bottom-18  right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                  className={`p-2 rounded-full cursor-pointer ${
                    product.inStock
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    product.inStock &&
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.prices[0].amount,
                      image: product.gallery[0],
                      quantity: 1,
                    })
                  }
                  disabled={!product.inStock} // Prevents clicking when out of stock
                >
                  <ShoppingCart size={24} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
