import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { getDefaultAttributes } from "../Utils/cartUtils";
import { useCart } from "../../Context/CartContext";

const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product.inStock) return;

    const defaultAttributes = getDefaultAttributes(product.attributes || []);
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.prices[0].amount,
        prices: product.prices,
        image: product.gallery[0],
        quantity: 1,
      },
      defaultAttributes,
      product.attributes
    );
  };

  return (
    <div
      key={product.id}
      className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-[386px] w-full h-[444px] mx-auto shadow-none group overflow-hidden border-15 border-transparent transition-all duration-300 hover:border-white-500 hover:shadow-[0_6px_20px_#A8ACB030] hover:cursor-pointer"
    >
      <div className="relative">
        <Link
          to={`/product/${product.id}`}
        >
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
      {product.prices[0].currency.symbol}{product.prices[0].amount.toFixed(2)}
      </p>
      <div className="absolute bottom-18 md:bottom-26 lg:bottom-18 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className={`p-2 rounded-full cursor-pointer ${
            product.inStock
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-400 text-gray-600 hover:cursor-not-allowed"
          }`}
          onClick={handleAddToCart}
          data-testid={`product-${product.name.replace(/\s+/g, "-").toLowerCase()}`}
          disabled={!product.inStock}
        >
          <ShoppingCart size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
