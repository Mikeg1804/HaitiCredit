import { gql } from '@apollo/client';

// Query to get a list of all loans
export const GET_LOANS = gql`
  query GetLoans {
    loan {
      _id
      loanName
      borrower {
        _id
        firstName
        lastName
      }
      lender {
        _id
        firstName
        lastName
      }
      loanAmount
      interestRate
      dateOfIssuance
      dateOfMaturity
    }
  }
`;

// Query to get a list of all borrowers
export const GET_BORROWERS = gql`
  query GetBorrowers {
    borrower {
      _id
      firstName
      lastName
      email
      NIF
      dateofBirth
      telePhone
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

// Query to get a list of borrowers with their loans
export const GET_BORROWERS_WITH_LOANS = gql`
  query GetBorrowersWithLoans {
    getBorrowersWithLoans {
      _id
      firstName
      lastName
      email
      NIF
      dateofBirth
      telePhone
      loans {
        _id
        loanName
        lender {
          _id
          firstName
          lastName
        }
        loanAmount
        interestRate
      }
    }
  }
  `;

// Query to get a specific borrower by NIF
export const GET_BORROWER_BY_NIF = gql`
  query GetBorrowerByNIF($borrowerNIF: String!) {
    getBorrower(borrowerNIF: $borrowerNIF) {
      _id
      firstName
      lastName
      email
      NIF
      dateofBirth
      telePhone
      loans {
        _id
        loanName
        lender {
          _id
          firstName
          lastName
        }
        loanAmount
        interestRate
      }
    }
  }
  `;

// Query to get a user's profile (requires authentication)
export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user {
      _id
      firstName
      lastName
      email
      telePhone
      NIF
      companyName
      addressStreet
      addressCity
      addressDepartment
      orders {
        _id
        purchaseDate
        products {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

// Query to get a specific order by ID
export const GET_ORDER_BY_ID = gql`
  query GetOrderById($_id: ID!) {
    order(_id: $_id) {
      _id
      purchaseDate
      products {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

// Query to get a checkout session for placing an order
export const GET_CHECKOUT_SESSION = gql`
  query GetCheckoutSession($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;
