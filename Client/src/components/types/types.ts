// This type is used for the  product details page and cart context
export interface Price {
  amount: number;
  currency: {
    label: string;
    symbol: string;
  };
};

export interface AttributeItem {
  id: string;
  value: string;
  displayValue: string;
};

export interface ProductAttribute  {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
};

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

// This type is used for the product image gallery component
export interface ProductImageGalleryProps  {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  productName: string;
};

// This type is used for the product attributes component

export interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

export type AttributeType = "text" | "swatch";

export interface ProductAttributesProps {
  attributes: Attribute[];
  selectedAttributes: Record<string, string>;
  onSelect: (attributeName: string, value: string) => void;
}


export interface AddToCartButtonProps {
  disabled?: boolean;
  onClick: () => void;
  testId?: string;
}