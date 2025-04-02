import { useCart } from "../../Context/CartContext";
import { Plus, Minus } from "lucide-react";
import { useMemo } from "react";

const CartDropdown = () => {
  const { cart, addToCart, updateQuantity } = useCart();

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    [cart]
  );

  return (
    <div className="absolute top-15 right-0 bg-white shadow-lg p-6 w-97  z-50">
      <h2 className="text-lg font-bold mb-3">
        My Bag, <span className="font-normal">{cart.length} items</span>
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center pb-4">
              <div className="relative flex items-center gap-8">
                <div className="ml-4 flex-1">
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-black-500 font-bold text-m">
                    ${item.price.toFixed(2)}
                  </p>
                  <span className="text-m ">Size: {item.size}</span>

                  <div className="flex space-x-2 mt-2">
                    {["XS", "S", "M", "L"].map((size) => (
                      <span
                        key={size}
                        className={`cursor-pointer px-2 py-1 border text-xs ${
                          item.size === size
                            ? "border-black font-semibold"
                            : "border-gray-300"
                        }`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>

                  <span className="text-m ">Color:</span>
                  <div className="flex space-x-2 mt-2">
                    {["#C4E1C5", "#333333", "#043927"].map((color) => (
                      <span
                        key={color}
                        className="w-5 h-5 border  cursor-pointer"
                        style={{
                          backgroundColor: color,
                          border:
                            item.color === color ? "2px solid black" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className=" flex items-center  ">
                  <button
                    className="cursor-pointer p-1 border absolute top-0 right-0"
                    onClick={() => addToCart(item)}
                  >
                    <Plus size={16} />
                  </button>
                  <span className="text-md font-semibold absolute right-2">{item.quantity}</span>
                  <button
                    className="cursor-pointer p-1 border absolute bottom-0 right-0"
                    onClick={() => updateQuantity(item.id, item.attributes || {}, -1)}                  >
                    <Minus size={16} />
                  </button>
                </div>

              </div>

              <img
                src={item.image}
                alt={item.name}
                className="w-44 h-44 object-contain"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-between items-center font-bold text-lg">
        <span>Total</span>
        <span>
          ${totalPrice}
        </span>
      </div>

      <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-md font-semibold">
        PLACE ORDER
      </button>
    </div>
  );
};

export default CartDropdown;
