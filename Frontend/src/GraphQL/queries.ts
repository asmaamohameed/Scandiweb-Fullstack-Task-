import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments';

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      brand
      inStock
      gallery
      prices {
        amount
        currency
      }
    }
  }
`;
export const GET_PRODUCTS = gql`
  query GetProductsByCategory($category: String!) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      attributes {
        name
        type
        items {
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    brand
    description
    inStock
    gallery
    attributes {
      id
      name
      type
      items {
        id
        value
        displayValue
        selected
      }
    }
    prices {
      amount
      currency {
        label
        symbol
      }
    }
    category {
      id
      name
    }
  }
}
`;

// export const GET_PRODUCTS = gql`
//   query ($category: String!) {
//     products(category: $category) {
//       ...ProductFields
//     }
//   }
//   ${PRODUCT_FIELDS}
// `;

export const GET_SINGLE_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;

export const GET_CATEGORIES_AND_PRODUCTS = gql`
  query ($category: String) {
    categories {
      name
    }
    products(category: $category) {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;
