import React from "react";

interface AttributeItem {
  id: string;
  value: string;
  displayValue: string;
}

interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

interface ProductAttributesProps {
  attributes: Attribute[];
  selectedAttributes: Record<string, string>;
  onSelect: (attributeName: string, value: string) => void;
}

const ProductAttributes: React.FC<ProductAttributesProps> = ({
  attributes,
  selectedAttributes,
  onSelect,
}) => {
  return (
    <>
      {attributes.map((attribute) => (
        <div key={attribute.id} className="mt-4">
          <h3 className="font-bold">{attribute.name.toUpperCase()}:</h3>
          <div className="flex gap-2 mt-1">
            {attribute.items.map((item) => {
              const isSelected =
                selectedAttributes[attribute.name] === item.value;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(attribute.name, item.value)}
                  className={`border px-4 py-2 text-sm hover:cursor-pointer ${
                    attribute.type === "swatch"
                      ? `w-10 h-10 ${
                          isSelected ? "border-green-500" : "border-gray-300"
                        }`
                      : `${
                          isSelected
                            ? `bg-black text-white border-black `
                            : "border-gray-500"
                        }`
                  }`}
                  style={
                    attribute.type === "swatch"
                      ? { backgroundColor: item.value }
                      : {}
                  }
                  data-testid={`product-attribute-${attribute.id}-${item.value}`}                  
                >                
                  {attribute.type !== "swatch" && item.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductAttributes;
