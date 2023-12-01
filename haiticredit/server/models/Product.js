const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
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
  nif: {
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
