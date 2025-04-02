export const areAttributesEqual = (
    attr1: Record<string, string> = {},
    attr2: Record<string, string> = {}
  ): boolean => {
    return (
      Object.keys(attr1).length === Object.keys(attr2).length &&
      Object.entries(attr1).every(([key, value]) => attr2[key] === value)
    );
  };
  