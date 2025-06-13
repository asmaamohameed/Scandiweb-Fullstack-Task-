import { useCart } from "../../context/cartContext";
import { useMemo } from "react";
import CartItem from "./CartItem";
import CartActions from "./CartActions";

const CartDropdown = ({
  setIsCartOpen,
}: {
  setIsCartOpen: (value: boolean) => void;
}) => {
  const { cart } = useCart();
  const totalPrice = useMemo(
    () =>
      cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
    [cart]
  );

  return (
    <div className="absolute top-15 right-10 bg-white shadow-lg p-6 w-80  md:w-95 lg:w-105 h-auto z-50">
      <h2 className="text-lg font-bold mb-10">
        My Bag, <span className="font-normal">{cart.length} items</span>
      </h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {cart.map((item) => (
            <CartItem
              key={`${item.id}-${JSON.stringify(item.attributes)}`}
              item={item}
            />
          ))}
        </div>
      )}
      <div className="mt-10 flex justify-between items-center font-bold text-lg">
        <span>Total</span>
        <span data-testid="cart-total">${totalPrice}</span>
      </div>
      <CartActions setIsCartOpen={setIsCartOpen} />
    </div>
  );
};

export default CartDropdown;
