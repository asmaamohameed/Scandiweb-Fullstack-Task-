import React from "react";

interface AddToCartButtonProps {
  inStock: boolean;
  onClick: () => void;
  testId?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  inStock,
  onClick,
  // testId = "add-to-cart",
}) => {
  return (
    <button
      className={`px-4 py-3 w-full mt-6 cursor-pointer ${
        inStock
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-400 text-gray-600 hover:cursor-not-allowed"
      }`}
      onClick={onClick}
      disabled={!inStock}
      // data-testid={testId}
    >
      ADD TO CART
    </button>
  );
};

export default AddToCartButton;
