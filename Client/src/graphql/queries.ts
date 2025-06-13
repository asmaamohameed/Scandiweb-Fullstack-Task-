import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
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
        id
        name
        type
        items {
          id
          value
          displayValue
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
