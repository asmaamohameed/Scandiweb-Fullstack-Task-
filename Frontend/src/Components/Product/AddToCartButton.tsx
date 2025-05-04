import React from "react";
import { useCart } from "../../Context/CartContext";

interface AddToCartButtonProps {
  inStock: boolean;
  onClick: () => void;
  testId?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  inStock,
  onClick,
  testId = "add-to-cart",
}) => {
  const {setIsCartOpen} = useCart(); 
  const handleClick = () => {
    onClick();
    setIsCartOpen(true); 
  }
  return (
    <button
      className={`px-4 py-3 w-full mt-6 cursor-pointer ${
        inStock
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-400 text-gray-600 hover:cursor-not-allowed"
      }`}
      onClick={handleClick}
      disabled={!inStock}
      data-testid={testId}
    >
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;
