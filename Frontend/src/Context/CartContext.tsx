import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { areAttributesEqual } from "../Components/Utils/cartUtils";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  prices: { currency: string; amount: number }[];
  image: string;
  quantity: number;
  attributes?: Record<string, string>; // selected values
  allAttributes?: {
    name: string;
    type: string;
    items: { displayValue: string; value: string; id: string }[];
  }[]; // full set of options
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: CartItem,
    selectedAttributes?: Record<string, string>,
    allAttributes?: CartItem["allAttributes"]
  ) => void;
  updateQuantity: (
    id: string,
    attributes: Record<string, string>,
    amount: number
  ) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const prevCart = localStorage.getItem("cart");
    if (prevCart !== JSON.stringify(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (
    product: CartItem,
    selectedAttributes: Record<string, string> = {},
    allAttributes: CartItem["allAttributes"] = []
  ) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) =>
          item.id === product.id &&
          areAttributesEqual(item.attributes, selectedAttributes)
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id &&
          areAttributesEqual(item.attributes, selectedAttributes)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          attributes: selectedAttributes,
          allAttributes,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (
    id: string,
    attributes: Record<string, string>,
    amount: number
  ) => {
    setCart((prevCart) =>
      prevCart.reduce((updatedCart, item) => {
        if (item.id === id && areAttributesEqual(item.attributes, attributes)) {
          const newQuantity = item.quantity + amount;
          if (newQuantity > 0) {
            updatedCart.push({ ...item, quantity: newQuantity });
          }
        } else {
          updatedCart.push(item);
        }
        return updatedCart;
      }, [] as CartItem[])
    );
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
