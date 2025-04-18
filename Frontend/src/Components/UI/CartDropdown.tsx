import { useCart } from "../../Context/CartContext";
import { Plus, Minus } from "lucide-react";
import { useMemo } from "react";

const CartDropdown = () => {
  const { cart, addToCart, updateQuantity } = useCart();

  const totalPrice = useMemo(
    () =>
      cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
    [cart]
  );

  return (
    <div className="absolute top-15 right-10 bg-white shadow-lg p-6 w-97  z-50">
      <h2 className="text-lg font-bold mb-10">
        My Bag, <span className="font-normal">{cart.length} items</span>
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="relative cart-item flex  py-4 border-b-2"
            >
              <div className="relative flex items-center pr-2 w-35 h-auto">
                <div className="flex-1">
                  <p className="text-base font-semibold pb-2 flex-wrap">{item.name}</p>
                  {item.allAttributes?.map((attribute) => (
                    <div key={attribute.name} className="mt-2">
                      <span className="text-sm font-semibold">
                        {attribute.name}:
                      </span>
                      <div className="flex mt-1 flex-wrap gap-1 ">
                        {attribute.items.map((attrItem) => {
                          const isColor = attrItem.value.startsWith("#");
                          const isSelected =
                            item.attributes?.[attribute.name] ===
                            attrItem.value;

                          return (
                            <span
                              key={attrItem.id}
                              className={`text-xs border px-2 py-1 cursor-pointer ${
                                isColor ? "w-6 h-6 " : "font-semibold"
                              }`}
                              style={{
                                backgroundColor: isColor
                                  ? attrItem.value
                                  : undefined,
                                color: isColor ? "transparent" : "black",
                                border: isSelected
                                  ? "2px solid black"
                                  : isColor
                                  ? "1px solid gray"
                                  : "1px solid lightgray",
                              }}
                            >
                              {!isColor && attrItem.value}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <h3 className="font-bold py-2">Price:</h3>
                  <p className="text-black-500 font-bold text-m ">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="relative flex items-center  w-44 h-44">
                <div className="flex flex-col items-center justify-between h-full pr-2">
                  <button
                    className="cursor-pointer p-1 border"
                    onClick={() => addToCart(item)}
                  >
                    <Plus size={16} />
                  </button>

                  <span className="text-md font-semibold">{item.quantity}</span>

                  <button
                    className="cursor-pointer p-1 border"
                    onClick={() =>
                      updateQuantity(item.id, item.attributes || {}, -1)
                    }
                  >
                    <Minus size={16} />
                  </button>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-44 h-44 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-between items-center font-bold text-lg">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>

      <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-md font-semibold cursor-pointer">
        PLACE ORDER
      </button>
    </div>
  );
};

export default CartDropdown;
