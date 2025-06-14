export const prepareOrderData = (cartItems: any[]) => {
  return cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    prices: item.prices.map((price: any) => ({
      amount: price.amount,
      currency: {
        label: price.currency.label,
        symbol: price.currency.symbol,
      },
    })),
    attributes: item.allAttributes?.map((attr: any) => ({
      id: attr.id,
      name: attr.name,
      type: attr.type,
      items: attr.items.map((value: any) => ({
        id: value.id,
        value: value.value,
        displayValue: value.displayValue,
        selected: item.attributes?.[attr.name] === value.value,
      })),
    })) || [],
  }));
};