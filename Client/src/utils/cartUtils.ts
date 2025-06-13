export const areAttributesEqual = (
  attr1: Record<string, string> = {},
  attr2: Record<string, string> = {}
): boolean => {
  return (
    Object.keys(attr1).length === Object.keys(attr2).length &&
    Object.entries(attr1).every(([key, value]) => attr2[key] === value)
  );
};

export const getDefaultAttributes = (
  attributes: { name: string; items: { value: string }[] }[] = []
): Record<string, string> => {
  const defaultAttrs: Record<string, string> = {};
  attributes.forEach((attr) => {
    if (attr.name && Array.isArray(attr.items) && attr.items.length > 0) {
      defaultAttrs[attr.name] = attr.items[0].value;
    }
  });

  return defaultAttrs;
};
