// need some work for the log in context.

const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Loan, Borrower, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        loan: async () => {
            return await Loan.find();
          },

        getBorrowerLoans: async (parent, { borrowerId }) => {
            return await Loan.find({ borrower: borrowerId }).populate('lender');
          },
        getBorrowersWithLoans: async () => {
        return await Borrower.find().populate({
        path: 'loans',
        populate: {
          path: 'lender',
          model: 'User',
        },
            });
        },

        getBorrower: async (parent, { borrowerNIF }) => {
            return await Borrower.find(borrowerNIF).populate({
              path: 'loans',
              populate: {
                path: 'lender',
                model: 'User',
              },
            });
          },

        user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.borrowers',
            populate: 'loans',
          });
  // don't understand this yet
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.borrowers',
          populate: 'loans'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');     
    },

    checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ borrower: args.borrower });
        const line_items = [];
  
        const { products } = await order.populate('products');
  
        for (let i = 0; i < borrower.length; i++) {
          const borrower = await stripe.borrower.create({
            name: borrower[i].name
          });
  
          const price = await stripe.prices.create({
            borrower: borrower.id,
            unit_amount: borrower[i].price * 100,
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
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    addOrder: async (parent, { borrower }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ borrower });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    createBorrower: async (parent, { input }) => {
      const newBorrower = new Borrower(input);
      return await newBorrower.save();
    },
    updateBorrower: async (parent, { borrowerId, input }) => {
      try {
        // Use findByIdAndUpdate to find the borrower by their ID and update their fields
        const updatedBorrower = await Borrower.findByIdAndUpdate(
          borrowerId,
          input,
          { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedBorrower) {
          throw new UserInputError('Borrower not found');
        }

        return updatedBorrower;
      } catch (error) {
        // Handle any errors, e.g., database errors
        throw new Error('Could not update the borrower');
      }
    },
    deleteBorrower: async (parent, { borrowerId }) => {
      try {
        // Use findByIdAndRemove to find and remove the borrower by their ID
        const deletedBorrower = await Borrower.findByIdAndRemove(borrowerId);

        if (!deletedBorrower) {
          throw new UserInputError('Borrower not found');
        }

        return deletedBorrower;
      } catch (error) {
        // Handle any errors, e.g., database errors
        throw new Error('Could not delete the borrower');
      }
    },
    createLoan: async (parent, { input }) => {
      const newLoan = new Loan(input);
      return await newLoan.save();
    },
    updateLoan: async (parent, { loanId, input }) => {
      try {
        // Use findByIdAndUpdate to find the loan by its ID and update it
        const updatedLoan = await Loan.findByIdAndUpdate(
          loanId,
          input,
          { new: true } // This option ensures that the updated document is returned
        );

        if (!updatedLoan) {
          throw new UserInputError('Loan not found');
        }

        return updatedLoan;
      } catch (error) {
        // Handle any errors, e.g., database errors
        throw new Error('Could not update the loan');
      }
    },
    deleteLoan: async (parent, { loanId }) => {
      try {
        // Use findByIdAndRemove to find and remove the loan by its ID
        const deletedLoan = await Loan.findByIdAndRemove(loanId);

        if (!deletedLoan) {
          throw new UserInputError('Loan not found');
        }

        return deletedLoan;
      } catch (error) {
        // Handle any errors, e.g., database errors
        throw new Error('Could not delete the loan');
      }
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
    },
  },
  };

module.exports = resolvers;