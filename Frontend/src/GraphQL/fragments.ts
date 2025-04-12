import { gql } from '@apollo/client';

export const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    id
    name
    inStock
    gallery
    description
    brand
    category
    prices {
      amount
      currency {
        label
        symbol
      }
    }
    attributes {
      id
      name
      type
      items {
        id
        attribute_id
        value
        displayValue
      }
    }
  }
`;
