const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanSchema = new Schema({
  loanName: {
    type: String,
    required: true,
    trim: true,
  },
  borrower: {
    type: Schema.Types.ObjectId,
    ref: 'Borrower',
    required: true,
  },
  lender: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  loanAmortizationAmount: {
    type: Number,
    required: false,
  },
  termOfLoan: {
    type: Number,
    required: true,
    trim: true,
  },
  finalPaymentAmount: {
    type: Number,
    required: true,
  },
  dateOfIssuance: {
    type: Date,
    required: true,
  },
  dateOfMaturity: {
    type: Date,
    required: true,
  },
  numberOfOnTimePayments: {
    type: Number,
    required: true,
  },
  dateOfMissedPayment: {
    type: Date,
    required: false,
    default: null, 
  },
  dateOfPaymentRemedied: {
    type: Date,
    required: false,
    default: null, 
  },
  supportingDocumentation: {
    type: String, 
    required: false,
  },
});

// Create a model using the schema
const LoanModel = mongoose.model('Loan', loanSchema);

module.exports = LoanModel;
