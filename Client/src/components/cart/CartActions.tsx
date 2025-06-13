import { useMutation } from "@apollo/client";
import { useCart } from "../../context/cartContext";
import { prepareOrderData } from "../../utils/orderUtils";
import { PLACE_ORDER } from "../../graphql/mutations";
import { useToast } from "../../context/toastContext"; 

const CartActions = ({
  setIsCartOpen,
}: {
  setIsCartOpen: (value: boolean) => void;
}) => {
  const { cart, clearCart } = useCart();
  const [placeOrder, { loading: placingOrder }] = useMutation(PLACE_ORDER);
  const { showToast } = useToast(); // 

  const handlePlaceOrder = async () => {
    const order = prepareOrderData(cart);
    try {
      const { data } = await placeOrder({
        variables: {
            order,
        },
      });

      if (data?.placeOrder) {
        showToast(data.placeOrder.message, "success");
        clearCart();
        setIsCartOpen(false); 
      }
    } catch (err: unknown) {
      console.error("Full error:", err);
      showToast("Failed to place order.", "error");
    }
  };

  return (
    <button
      className={`w-full mt-4 py-3 rounded-md font-semibold 
        ${
          cart.length === 0 || placingOrder
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
        }`}
      onClick={handlePlaceOrder}
      disabled={cart.length === 0 || placingOrder}
      data-testid="place-order-btn"
    >
      {placingOrder ? "Placing Order..." : "PLACE ORDER"}
    </button>
  );
};

export default CartActions;
