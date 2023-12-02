const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Date
scalar Number

  type Category {
    _id: ID
    name: String
  }

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

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
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
    borrowernif: String
    usernif: String
    borrower: [Borrower]
    user: [User]
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

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
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
    getBorrower(borrowernif: String!): Borrower
    getLoans(borrowernif: String!): Loan
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, telePhone: String!, password: String!, nif: String!, companyName: String!, addressStreet: String!, addressCity: String!, addressDepartment:String!): Auth
    createBorrower (firstName: String!, lastName: String!, email: String!, nif: String!, dateofBirth: Date!, addressStreet: String!, addressCity: String!, addressDepartment:String!, telePhone: String!): Borrower
    createLoan (loanName: String!, loanAmount: Number!, interestRate: Number!,loanAmortizationAmount: Number!, termOfLoan: Number!, finalPaymentAmount: Number!, dateOfIssuance: Date!, dateOfMaturity: Date!, numberOfOnTimePayments: Number!, dateOfMissedPayment: Date!, dateOfPaymentRemedied: Date!, supportingDocumentation: String!, borrowernif: String!, usernif: String!): Loan
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, telePhone: String, password: String, nif: String, companyName: String, addressStreet: String, addressCity: String, addressDepartment:String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
