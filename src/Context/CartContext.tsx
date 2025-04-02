import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { areAttributesEqual } from "../Components/Utiles/cartUtiles";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  attributes?: Record<string, string>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: CartItem,
    selectedAttributes?: Record<string, string>
  ) => void;
  updateQuantity: (
    id: string,
    attributes: Record<string, string>,
    amount: number
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, attributes = {}) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          JSON.stringify(item.attributes) === JSON.stringify(attributes)
      );
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          JSON.stringify(item.attributes) === JSON.stringify(attributes)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, attributes }];
      }
    });
  };
  
  const updateQuantity = (
    id: string,
    attributes: Record<string, string>,
    amount: number
  ) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id && areAttributesEqual(item.attributes, attributes)
              ? { ...item, quantity: Math.max(item.quantity + amount, 0) } // Ensure quantity never goes below 0
              : item
          )
          .filter((item) => item.quantity > 0) // Remove only items with 0 quantity
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
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
