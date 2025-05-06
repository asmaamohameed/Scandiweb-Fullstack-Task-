import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../GraphQL/queries";
import Loading from "../Components/Fallbacks/Loading";
import ErrorPage from "../Components/Fallbacks/ErrorPage";
import ProductImageGallery from "../Components/Product/ImageGallery";
import ProductAttributes from "../Components/Product/ProductAttributes";
import AddToCartButton from "../Components/Product/AddToCartButton";

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

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorPage message="Failed to fetch product from server. Please check your connection." />
    );

  if (!product) {
    return (
      <ErrorPage message="Failed to fetch product from server. Product Not Found" />
    );
  }
  const areAllAttributesSelected =
  product &&
  product.attributes.every(
    (attr: any) => selectedAttributes[attr.name] !== undefined
  );


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
    <main
      className="container mx-auto px-4 md:px-6 py-8 max-w-[1400px]"
      data-testid={`product-${product.name.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <ProductImageGallery
          images={product.gallery}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          productName={product.name}
        />

        {/* Product Info */}
        <div className="max-w-xs">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <ProductAttributes
            attributes={product.attributes}
            selectedAttributes={selectedAttributes}
            onSelect={handleAttributeSelect}
          />

          {/* Price */}
          <div className="mt-4">
            <h3 className="font-bold">PRICE:</h3>
            <p className="text-xl font-bold mt-2">
              {product.prices[0].currency.symbol}
              {product.prices[0].amount.toFixed(2)}
            </p>
          </div>

          {/* Add to Cart */}
          <AddToCartButton
            inStock={product.inStock}
            disabled={!product.inStock || !areAllAttributesSelected}
            onClick={() =>
              product.inStock &&
              addToCart(
                {
                  id: product.id,
                  name: product.name,
                  price: product.prices[0].amount,
                  prices: product.prices,
                  image: product.gallery[selectedIndex],
                  quantity: 1,
                },
                selectedAttributes,
                product.attributes
              )
            }
          />

          {/* Description */}
          <p className="mt-4 text-gray-600" data-testid="product-description">
            {parse(DOMPurify.sanitize(product.description.replace(/\\n/g, "")))}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
