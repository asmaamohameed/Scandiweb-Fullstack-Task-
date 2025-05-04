import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useCart } from "../../Context/CartContext";
import { prepareOrderData } from "../Utils/orderUtils";
import { PLACE_ORDER } from "../../GraphQL/mutations";

const CartActions = ({ setIsCartOpen }: { setIsCartOpen: (value: boolean) => void }) => {
  const { cart, clearCart } = useCart();
  
  const [placeOrder, { loading: placingOrder }] = useMutation(PLACE_ORDER);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handlePlaceOrder = async () => {
    const order = prepareOrderData(cart);

    try {
      const { data } = await placeOrder({
        variables: { order },
      });

      if (data?.placeOrder?.message) {
        showToast(data.placeOrder.message);
        clearCart();
        setIsCartOpen(false);
      }
    } catch (err: unknown) {
      console.error("Full error:", err);
      showToast("Failed to place order.");
    }
  };

  return (
    <>
      <button
        className={`w-full mt-4 py-3
         rounded-md font-semibold 
         ${
           cart.length === 0 || placingOrder
             ? "bg-gray-400 cursor-not-allowed"
             : "bg-green-500 hover:bg-green-600 text-white cursor-pointer"
         }
           `}
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || placingOrder}
        data-testid="place-order-btn"
      >
        {placingOrder ? "Placing Order..." : "PLACE ORDER"}
      </button>
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-5 rounded shadow-lg animate-slide-in z-50">
          {toast}
        </div>
      )}
    </>
  );
};

export default CartActions;
