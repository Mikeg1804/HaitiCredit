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
  mutation addOrder($borrowers: [ID]!) {
    addOrder(borrowers: $borrowers) {
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

export const CREATE_USER = gql`
  mutation createUser(
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
    createUser(
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
    $loanName: String
    $loanAmount: Number
    $interestRate: Number
    $loanAmortizationAmount: Number
    $termOfLoan: Int
    $finalPaymentAmount: Number
    $dateOfIssuance: Date
    $dateOfMaturity: Date
    $numberOfOnTimePayments: Int
    $dateOfMissedPayment: Date
    $dateOfPaymentRemedied: Date
    $supportingDocumentation: String
    $borrowerId: ID!  
    $userId: ID!  
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
      borrowerId: $borrowerId  # Include the borrowerId in the mutation
      userId: $userId  # Include the userId in the mutation
    ) {
      _id
      loanName
      loanAmount
      borrower {
        _id
      }
      user {
        _id
      }
    }
  }
`;



// import gql from 'graphql-tag';

// export const CREATE_LOAN = gql`
//   mutation createLoan(
//     $loanId: ID!
//     $loanName: String
//     $loanAmount: Float
//     $interestRate: Float
//     $loanAmortizationAmount: Float
//     $termOfLoan: Int
//     $finalPaymentAmount: Float
//     $dateOfIssuance: Date
//     $dateOfMaturity: Date
//     $numberOfOnTimePayments: Int
//     $dateOfMissedPayment: Date
//     $dateOfPaymentRemedied: Date
//     $supportingDocumentation: String
//     $borrowerNIF: String!  # Assuming you have a NIF for the borrower
//     $userNIF: String!  # Assuming you have a NIF for the user
//   ) {
//     createLoan(
//       loanId: $loanId
//       loanName: $loanName
//       loanAmount: $loanAmount
//       interestRate: $interestRate
//       loanAmortizationAmount: $loanAmortizationAmount
//       termOfLoan: $termOfLoan
//       finalPaymentAmount: $finalPaymentAmount
//       dateOfIssuance: $dateOfIssuance
//       dateOfMaturity: $dateOfMaturity
//       numberOfOnTimePayments: $numberOfOnTimePayments
//       dateOfMissedPayment: $dateOfMissedPayment
//       dateOfPaymentRemedied: $dateOfPaymentRemedied
//       supportingDocumentation: $supportingDocumentation
//       borrowerNIF: $borrowerNIF  # Include the borrower's NIF in the mutation
//       userNIF: $userNIF  # Include the user's NIF in the mutation
//     ) {
//       _id
//       loanName
//       loanAmount
//       borrower {
//         _id
//         // other borrower fields
//       }
//       user {
//         _id
//         // other user fields
//       }
//     }
//   }
// `;




// export const UPDATE_USER = gql`
//   mutation updateUser(
//     $firstName: String
//     $lastName: String
//     $email: String
//     $telePhone: String
//     $password: String
//     $NIF: String
//     $companyName: String
//     $addressStreet: String
//     $addressCity: String
//     $addressDepartment: String
//   ) {
//     updateUser(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       telePhone: $telePhone
//       password: $password
//       NIF: $NIF
//       companyName: $companyName
//       addressStreet: $addressStreet
//       addressCity: $addressCity
//       addressDepartment: $addressDepartment
//     ) {
//       _id
//       firstName
//       lastName
//       email
//     }
//   }
// `;

// export const UPDATE_BORROWER = gql`
//   mutation updateBorrower(
//     $firstName: String
//     $lastName: String
//     $email: String
//     $NIF: String
//     $dateofBirth: String
//     $addressStreet: String
//     $addressCity: String
//     $addressDepartment: String
//     $telePhone: String
//   ) {
//     updateBorrower(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       NIF: $NIF
//       dateofBirth: $dateofBirth
//       addressStreet: $addressStreet
//       addressCity: $addressCity
//       addressDepartment: $addressDepartment
//       telePhone: $telePhone
//     ) {
//       _id
//       firstName
//       lastName
//       email
//     }
//   }
// `;

// export const UPDATE_LOAN = gql`
//   mutation updateLoan(
//     $loanId: ID!
//     $loanName: String
//     $loanAmount: Number
//     $interestRate: Number
//     $loanAmortizationAmount: Number
//     $termOfLoan: Number
//     $finalPaymentAmount: Number
//     $dateOfIssuance: Date
//     $dateOfMaturity: Date
//     $numberOfOnTimePayments: Number
//     $dateOfMissedPayment: Date
//     $dateOfPaymentRemedied: Date
//     $supportingDocumentation: String
//   ) {
//     updateLoan(
//       loanId: $loanId
//       loanName: $loanName
//       loanAmount: $loanAmount
//       interestRate: $interestRate
//       loanAmortizationAmount: $loanAmortizationAmount
//       termOfLoan: $termOfLoan
//       finalPaymentAmount: $finalPaymentAmount
//       dateOfIssuance: $dateOfIssuance
//       dateOfMaturity: $dateOfMaturity
//       numberOfOnTimePayments: $numberOfOnTimePayments
//       dateOfMissedPayment: $dateOfMissedPayment
//       dateOfPaymentRemedied: $dateOfPaymentRemedied
//       supportingDocumentation: $supportingDocumentation
//     ) {
//       _id
//       loanName
//       loanAmount
//     }
//   }
// `;

// export const UPDATE_ORDER = gql`
//   mutation updateOrder(
//     $_id: ID!
//     $quantity: Int!
//   ) {
//     updateOrder(
//       _id: $_id
//       quantity: $quantity
//     ) {
//       _id
//       purchaseDate
//     }
//   }
// `;

// export const DELETE_USER = gql`
//   mutation deleteUser($_id: ID!) {
//     deleteUser(_id: $_id) {
//       _id
//     }
//   }
// `;

// export const DELETE_BORROWER = gql`
//   mutation deleteBorrower($_id: ID!) {
//     deleteBorrower(_id: $_id) {
//       _id
//     }
//   }
// `;
// export const DELETE_LOAN = gql`
//   mutation deleteLoan($loanId: ID!) {
//     deleteLoan(loanId: $loanId) {
//       _id
//     }
//   }
// `;

// export const DELETE_ORDER = gql`
//   mutation deleteOrder($_id: ID!) {
//     deleteOrder(_id: $_id) {
//       _id
//     }
//   }
//   `; 
