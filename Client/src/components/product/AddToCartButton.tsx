import React from "react";
import { useCart } from "../../context/cartContext";

interface AddToCartButtonProps {
  disabled?: boolean;
  onClick: () => void;
  testId?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  testId = "add-to-cart",
  disabled = false,
}) => {
  const { setIsCartOpen } = useCart();
  const handleClick = () => {
    if (!disabled) {
      onClick();
      setIsCartOpen(true);
    }
  };
  return (
    <button
      className={`px-4 py-3 w-full mt-6 font-semibold rounded-md transition-all duration-200 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600  cursor-pointer"
      }`}
      onClick={handleClick}
      disabled={disabled}
      data-testid={testId}
    >
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;
