import { useParams } from "react-router-dom";
import localdata from "../data.json";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = localdata.data.products.find((p) => p.id === id);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  if (!product) {
    return (
      <h1 className="text-center text-2xl font-bold">Product Not Found</h1>
    );
  }

  // Handle attribute selection
  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % product.gallery.length);
  };

  const handlePrev = () => {
    setSelectedIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.gallery.length) % product.gallery.length
    );
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="flex gap-4">
          {/* Vertical Thumbnail Gallery */}
          <div className="flex flex-col gap-2">
            {product.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.name}
                className={`w-20 h-20 object-contain cursor-pointer border-2 transition-all ${
                  selectedIndex === index
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>

          {/* Main Image with Slider */}
          <div className="flex-1 relative">
            <img
              src={product.gallery[selectedIndex]}
              alt={product.name}
              className="object-cover w-full h-auto"
            />
            <button
              className="absolute top-1/2 left-2 bg-gray-800 text-white p-2 cursor-pointer"
              onClick={handlePrev}
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute top-1/2 right-2 bg-gray-800 text-white p-2 cursor-pointer"
              onClick={handleNext}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-xs">
          {/* Product Name */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Attributes Section */}
          <div className="mt-4">
            {/* Size Options */}
            {product.attributes
              .filter((attr) => attr.type !== "swatch")
              .map((attribute) => (
                <div key={attribute.id} className="mt-2">
                  <h3 className="font-bold">{attribute.name}:</h3>
                  <div className="flex gap-2">
                    {attribute.items.map((item) => (
                      <button
                        key={item.id}
                        className={`border px-4 py-2 text-sm hover:cursor-pointer ${
                          selectedAttributes[attribute.name] === item.value
                            ? "bg-black text-white border-black"
                            : "border-gray-500"
                        }`}
                        onClick={() =>
                          handleAttributeSelect(attribute.name, item.value)
                        }
                      >
                        {item.displayValue}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

            {/* Color Swatches */}
            {product.attributes
              .filter((attr) => attr.type === "swatch")
              .map((attribute) => (
                <div key={attribute.id} className="mt-4">
                  <h3 className="font-bold">{attribute.name}:</h3>
                  <div className="flex gap-2">
                    {attribute.items.map((item) => (
                      <button
                        key={item.id}
                        className={`w-10 h-10 border hover:cursor-pointer ${
                          selectedAttributes[attribute.name] === item.value
                            ? "border-green-500"
                            : "border-gray-300"
                        }`}
                        onClick={() =>
                          handleAttributeSelect(attribute.name, item.value)
                        }
                        style={{ backgroundColor: item.value }}
                      />
                    ))}
                  </div>
                </div>
              ))}

            {/* Price Section */}
            <div className="mt-4">
              <h3 className="font-bold">Price:</h3>
              <p className="text-xl font-bold mt-2">
                ${product.prices[0].amount}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              className="bg-green-500 text-white px-4 py-3 w-full mt-6 hover:cursor-pointer"
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.prices[0].amount,
                    image: product.gallery[selectedIndex],
                    quantity: 1,
                  },
                  selectedAttributes
                )
              }
            >
              ADD TO CART
            </button>
          </div>

          {/* Product Description */}
          <p className="mt-4 text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
