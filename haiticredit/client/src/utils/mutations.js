import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $telePhone: String!
    $password: String!
    $nif: String!
    $companyName: String!
    $addressStreet: String!
    $addressCity: String!
    $addressDepartment: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      telePhone: $telePhone
      password: $password
      nif: $nif
      companyName: $companyName
      addressStreet: $addressStreet
      addressCity: $addressCity
      addressDepartment: $addressDepartment
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_BORROWER = gql`
  mutation createBorrower(
    $firstName: String!
    $lastName: String!
    $email: String!
    $nif: String!
    $dateofBirth: Date!
    $addressStreet: String!
    $addressCity: String!
    $addressDepartment: String!
    $telePhone: String!
  ) {
    createBorrower(
      firstName: $firstName
      lastName: $lastName
      email: $email
      nif: $nif
      dateofBirth: $dateofBirth
      addressStreet: $addressStreet
      addressCity: $addressCity
      addressDepartment: $addressDepartment
      telePhone: $telePhone
    ) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const CREATE_LOAN = gql`
  mutation createLoan(
    $loanName: String!
    $loanAmount: Number!
    $interestRate: Number!
    $loanAmortizationAmount: Number!
    $termOfLoan: Number!
    $finalPaymentAmount: Number!
    $dateOfIssuance: Date!
    $dateOfMaturity: Date!
    $numberOfOnTimePayments: Number!
    $dateOfMissedPayment: Date!
    $dateOfPaymentRemedied: Date!
    $supportingDocumentation: String!
    $borrowernif: String! 
    $usernif: String!  
  ) {
    createLoan(
      loanName: $loanName
      loanAmount: $loanAmount
      interestRate: $interestRate
      loanAmortizationAmount: $loanAmortizationAmount
      termOfLoan: $termOfLoan
      finalPaymentAmount: $finalPaymentAmount
      dateOfIssuance: $dateOfIssuance
      dateOfMaturity: $dateOfMaturity
      numberOfOnTimePayments: $numberOfOnTimePayments
      dateOfMissedPayment: $dateOfMissedPayment
      dateOfPaymentRemedied: $dateOfPaymentRemedied
      supportingDocumentation: $supportingDocumentation
      borrowernif: $borrowernif 
      usernif: $usernif 
    ) {
      _id
      loanName
      loanAmount
      borrowernif {
        _id
        nif
        firstName
        lastName
      }
      usernif {
        _id
        nif
      }
    }
  }  
`;
