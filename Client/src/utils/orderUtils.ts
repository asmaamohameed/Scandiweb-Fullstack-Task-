export const prepareOrderData = (cartItems: any[]) => {
  return cartItems.map((item) => ({
    productId: item.id, // ✅ renamed
    quantity: item.quantity,
    attributeValues:
      item.allAttributes?.flatMap((attr: any) =>
        attr.items
          .filter((value: any) => item.attributes?.[attr.name] === value.value)
          .map((value: any) => ({
            id: value.id,
            value: value.value,
            displayValue: value.displayValue,
            selected: true,
          }))
      ) || [],
  }));
};
