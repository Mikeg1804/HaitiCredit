const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Loan, Borrower } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// const mongoose = require('mongoose');
// const { Types } = mongoose;

// const isValidObjectId = id => Types.ObjectId.isValid(id);

const resolvers = {
  Query: {
    // getLoans: async (parent, { borrowernif }) => {
    //   try {
    //     // Check if borrowernif is a valid ObjectId (assuming it's a MongoDB ObjectId)
    //     if (isValidObjectId(borrowernif)) {
    //       // If it's a valid ObjectId, use it to find by _id
    //       const loan = await Loan.findById(borrowernif);
    //       return loan ? [loan] : [];
    //     } else {
    //       // If it's not a valid ObjectId, assume it's a string and find by borrowernif
    //       const loans = await Loan.find({ borrowernif });
    //       return loans;
    //     }
    //   } catch (error) {
    //     console.error('Error fetching loans:', error);
    //     throw error;
    //   }
    // },

    getBorrower: async (parent, { borrowernif }) => {
      return await Borrower.findOne({ nif: borrowernif });
    },

    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id)
        .populate('category')
        .populate({
          path: 'loans',
          populate: 'user',
        });
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    createBorrower: async (parent, args) => {

        const borrower = await Borrower.create(args);
        return borrower;

    },

  createLoan: async (parent, args) => {
    const borrower = await Borrower.findOne({ nif: args.borrowernif });
    const user = await User.findOne({ nif: args.usernif });
    args.borrower = borrower._id;
    args.user = user._id;
    const loan = (await Loan.create(args));
    loan.populate('borrower');
    loan.populate('user');
    loan.save();
    return loan;
  },

    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
