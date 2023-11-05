const mongoose = require('mongoose');
const { Schema } = mongoose;

const borrowerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: false, // Ensure each borrower has a unique email
  },
  NIF: {
    type: String, // Assuming NIF might include letters and numbers
    required: true,
  },
  dateofBirth: {
    type: Date,
    required: true,
  },
  addressStreet: {
    type: String,
    minlength: 0,
  },
  addressCity: {
    type: String,
    minlength: 0,
  },
  addressDepartment: {
    type: String,
    minlength: 0,
  },
  telePhone: {
    type: String, // Use String for phone numbers
  },
  loans: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
    },
  ],
});

// Create a model using the schema
const BorrowerModel = mongoose.model('Borrower', borrowerSchema);

module.exports = BorrowerModel;
