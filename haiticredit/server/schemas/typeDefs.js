
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date
  scalar Number

  type Borrower {
    _id: ID
    firstName: String
    lastName: String
    email: String
    nif: String
    dateofBirth: Date
    addressStreet: String
    addressCity: String
    addressDepartment: String
    telePhone: String
    loans: [Loan]
  }

  type Loan {
    _id: ID
    loanName: String
    borrower: ID # Reference the ID of the related Borrower
    lender: User
    loanAmount: Number
    interestRate: Number
    loanAmortizationAmount: Number
    termOfLoan: Number
    finalPaymentAmount: Number
    dateOfIssuance: Date
    dateOfMaturity: Date
    numberOfOnTimePayments: Number
    dateOfMissedPayment: Date
    dateOfPaymentRemedied: Date
    supportingDocumentation: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    telePhone: String
    nif: String
    companyName: String
    addressStreet: String
    addressCity: String
    addressDepartment: String
    orders: [Order]
  }
  
  type Order {
    _id: ID
    purchaseDate: String
    products: [Borrower]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    loan: [Loan] 
    borrower: [Borrower]
    getBorrowerLoans(borrowerId: ID!): [Loan]
    getBorrowersWithLoans: [Borrower]
    getBorrower(borrowernif: String!): Borrower
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    createUser (firstName: String!, lastName: String!, email: String!, telePhone: String!, password: String!, nif: String!, companyName: String!, addressStreet: String!, addressCity: String!, addressDepartment:String!): Auth
    createBorrower (firstName: String!, lastName: String!, email: String!, nif: String!, dateofBirth: Date!, addressStreet: String!, addressCity: String!, addressDepartment:String!, telePhone: String!): Borrower
    createLoan (loanName: String!, loanAmount: Number!, interestRate: Number!,loanAmortizationAmount: Number!, termOfLoan: Number!, finalPaymentAmount: Number!, dateOfIssuance: Date!, dateOfMaturity: Date!, numberOfOnTimePayments: Number!, dateOfMissedPayment: Date!, dateOfPaymentRemedied: Date!, supportingDocumentation: String!): LoanResponse
    addOrder(borrowers: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, telePhone: String, password: String, nif: String!, companyName: String, addressStreet: String, addressCity: String, addressDepartment:String): User
    updateBorrower(firstName: String, lastName: String, email: String, nif: String, dateofBirth: Date, addressStreet: String, addressCity: String, addressDepartment:String, telePhone: String): Borrower
    updateLoan (loanName: String, loanAmount: Number, interestRate: Number, loanAmortizationAmount: Number, termOfLoan: Number, finalPaymentAmount: Number, dateOfIssuance: Date, dateOfMaturity: Date, numberOfOnTimePayments: Number!, dateOfMissedPayment: Date, dateOfPaymentRemedied: Date, supportingDocumentation: String): LoanResponse
    updateOrder(_id: ID!, quantity: Int!): Order
    deleteUser(_id: ID!): User
    deleteBorrower(_id: ID!): Borrower
    deleteOrder(_id: ID!): Order
    deleteLoan(loanId: ID!): Loan
    login(email: String!, password: String!): Auth
  }
  type LoanResponse {
    borrower: Borrower
    lender: User
  }
`;

module.exports = typeDefs;
