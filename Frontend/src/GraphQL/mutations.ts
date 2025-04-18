import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation ($orderInput: OrderInput!) {
    createOrder(input: $orderInput) {
      id
      status
    }
  }
`;
