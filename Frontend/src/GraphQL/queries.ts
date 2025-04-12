import { gql } from '@apollo/client';
import { PRODUCT_FIELDS } from './fragments';

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query ($category: String) {
    products(category: $category) {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;

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
