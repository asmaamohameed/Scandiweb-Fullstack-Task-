import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../GraphQL/queries";

const ProductPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });
  const { addToCart } = useCart();

  const product = data?.product;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (product) {
      const defaultAttributes: Record<string, string> = {};
      product.attributes.forEach((attr: any) => {
        if (attr.items.length > 0) {
          defaultAttributes[attr.name] = attr.items[0].value;
        }
      });
      setSelectedAttributes(defaultAttributes);
    }
  }, [product]);

  if (loading) return <p className="text-center">Loading product...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading product.</p>;

  if (!product) {
    return (
      <h1 className="text-center text-2xl font-bold">Product Not Found</h1>
    );
  }

  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % product.gallery.length);
  };

  const handlePrev = () =>
    setSelectedIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.gallery.length) % product.gallery.length
    );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-[1400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="flex gap-4">
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
          <div className="flex-1 relative h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center bg-white ">
            <img
              src={product.gallery[selectedIndex]}
              alt={product.name}
              className="object-contain absolute inset-0 h-[300px] md:h-[400px] lg:h-[500px] w-full"
            />
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 hover:cursor-pointer z-10"
              onClick={handlePrev}
            >
              <FaChevronLeft />
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 hover:cursor-pointer z-10"
              onClick={handleNext}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="max-w-xs">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Attributes */}
          {product.attributes.map((attribute) => (
            <div key={attribute.id} className="mt-4">
              <h3 className="font-bold">{attribute.name}:</h3>
              <div className="flex gap-2 mt-1">
                {attribute.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      handleAttributeSelect(attribute.name, item.value)
                    }
                    className={`border px-4 py-2 text-sm hover:cursor-pointer ${
                      attribute.type === "swatch"
                        ? `w-10 h-10 ${
                            selectedAttributes[attribute.name] === item.value
                              ? "border-green-500"
                              : "border-gray-300"
                          }`
                        : `${
                            selectedAttributes[attribute.name] === item.value
                              ? "bg-black text-white border-black"
                              : "border-gray-500"
                          }`
                    }`}
                    style={
                      attribute.type === "swatch"
                        ? { backgroundColor: item.value }
                        : {}
                    }
                  >
                    {attribute.type !== "swatch" && item.displayValue}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Price */}
          <div className="mt-4">
            <h3 className="font-bold">Price:</h3>
            <p className="text-xl font-bold mt-2">
              {product.prices[0].currency.symbol}
              {product.prices[0].amount}
            </p>
          </div>

          {/* Add to Cart */}
          <button
            className={` px-4 py-3 w-full mt-6 cursor-pointer ${
              product.inStock
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-600 hover:cursor-not-allowed"
            }`}
            onClick={() =>
              product.inStock &&
              addToCart(
                {
                  id: product.id,
                  name: product.name,
                  price: product.prices[0].amount,
                  image: product.gallery[selectedIndex],
                  quantity: 1,
                },
                selectedAttributes,
                product.attributes
              )
            }
            disabled={!product.inStock}
          >
            ADD TO CART
          </button>

          {/* Description */}
          <p
            className="mt-4 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: product.description.replace(/\\n/g, ""),
            }}
          ></p>
          {/* <p className="mt-4 text-gray-600">{product.description}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
