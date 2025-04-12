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
  attributes?: Record<string, string>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem, selectedAttributes?: Record<string, string>) => void;
  updateQuantity: (id: string, attributes: Record<string, string>, amount: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const prevCart = localStorage.getItem("cart");
    if (prevCart !== JSON.stringify(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: CartItem, selectedAttributes: Record<string, string> = {}) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && areAttributesEqual(item.attributes, selectedAttributes)
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id && areAttributesEqual(item.attributes, selectedAttributes)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, attributes: selectedAttributes, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, attributes: Record<string, string>, amount: number) => {
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
