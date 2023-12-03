import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;


// Query to get a specific borrower by NIF
export const GET_BORROWER_BY_NIF = gql`
query Query($borrowernif: String!) {
  getBorrower(borrowernif: $borrowernif) {
    _id
    firstName
    lastName
    email
    nif
    dateofBirth
    addressStreet
    addressCity
    addressDepartment
    telePhone
  }
}
  `;

  export const GET_LOANS = gql`
  query Query($borrowernif: String!) {
    getLoans(borrowernif: $borrowernif) {
      dateOfIssuance
      dateOfMaturity
      dateOfMissedPayment
      finalPaymentAmount
      dateOfPaymentRemedied
      interestRate
      loanAmortizationAmount
      loanAmount
      loanName
      numberOfOnTimePayments
      supportingDocumentation
      termOfLoan
      borrower {
        firstName
        nif
      }
      user {
        firstName
        nif
      }
    }
  }
`;
