const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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
    unique: true,
  },
  telePhone: {
    type: String, // Use String for phone numbers
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  NIF: {
    type: String, // Use String for NIF if it may contain letters
    required: true,
  },
  companyName: {
    type: String,
    required: false,
  },
  addressStreet: {
    type: String,
    required: false,
  },
  addressCity: {
    type: String,
    required: false,
  },
  addressDepartment: {
    type: String,
    required: false,
  },
});

// Set up pre-save middleware to create password hash
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
