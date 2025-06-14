import { Plus, Minus } from "lucide-react";
import { CartItem as ItemType, useCart } from "../../context/cartContext";
import clsx from "clsx";

interface CartItemProps {
  item: ItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { addToCart, updateQuantity } = useCart();
  const handleIncrease = () =>
    addToCart(item, item.attributes, item.allAttributes);
  const handleDecrease = () =>
    updateQuantity(item.id, item.attributes || {}, -1);

  return (
    <div className="relative cart-item flex py-4">
      <div className="relative flex items-center pr-2 w-30 md:w-30 lg:w-35  h-auto">
        <div className="flex-1">
          <p className="text-base font-semibold pb-2 flex-wrap">{item.name}</p>
          <h3 className="font-bold py-2">Price:</h3>
          <p className="text-black-500 font-bold text-m ">
            ${item.price.toFixed(2)}
          </p>
          {item.allAttributes?.map((attribute) => (
            <div
              key={attribute.name}
              data-testid={`product-attribute-${attribute.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="mt-2"
            >
              <span className="text-sm font-semibold">{attribute.name}:</span>
              <div className="flex mt-1 flex-wrap gap-1 ">
                {attribute.items.map((attrItem) => {
                  const isColor = attrItem.value.startsWith("#");
                  const isSelected =
                    item.attributes?.[attribute.name] === attrItem.value;

                  const attributeNameKebab = attribute.name
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const valueKebab = attrItem.value
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <span
                      key={attrItem.id}
                      data-testid={
                        isSelected
                          ? `product-attribute-${attributeNameKebab}-${valueKebab}`
                          : `product-attribute-${attributeNameKebab}-${valueKebab}`
                      }
                      className={clsx(
                        "text-xs border px-2 py-1 cursor-pointer",
                        isColor && "w-6 h-6",
                        {
                          "border-2 border-black": isSelected,
                          "border border-gray-300": !isSelected && !isColor,
                          "border border-gray-500": !isSelected && isColor,
                        }
                      )}
                      style={{
                        backgroundColor: isColor ? attrItem.value : undefined,
                        color: isColor ? "transparent" : "black",
                      }}
                    >
                      {!isColor && attrItem.value}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex items-center w-25 md:w-39 lg:w-44  h-25 md:h-39 lg:h-44">
        <div className="flex flex-col items-center justify-between h-full pr-2">
          <button
            className="cursor-pointer p-1 border"
            onClick={handleIncrease}
            data-testid="cart-item-amount-increase"
          >
            <Plus className="responsive-icon w-3 lg:w-4 h-3 lg:h-4" />{" "}
          </button>
          <span
            data-testid="cart-item-amount"
            className="text-md font-semibold"
          >
            {item.quantity}
          </span>
          <button
            className="cursor-pointer p-1 border"
            onClick={handleDecrease}
            data-testid="cart-item-amount-decrease"
          >
            <Minus className="responsive-icon w-3 lg:w-4 h-3 lg:h-4" />{" "}
          </button>
        </div>
        <img
          src={item.image}
          alt={item.name}
          className="lg:w-44 md:w-39 w-25 lg:h-44 md:h-39 h-25 object-cover"
        />
      </div>
    </div>
  );
};

export default CartItem;
