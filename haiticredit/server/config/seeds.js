const db = require('./connection');
const { User, Loan, Borrower, Order } = require('../models');


// // Connect to your MongoDB database
// mongoose.connect('mongodb://localhost/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', async () => {
  // Seed data for Borrower
  const borrowers = await Borrower.create([
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      NIF: '123456789',
      dateofBirth: new Date('1990-01-01'),
      addressStreet: '123 Main St',
      addressCity: 'Cityville',
      addressDepartment: 'Dept A',
      telePhone: '123-456-7890',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      NIF: '987654321',
      dateofBirth: new Date('1995-02-15'),
      addressStreet: '456 Elm St',
      addressCity: 'Townsville',
      addressDepartment: 'Dept B',
      telePhone: '987-654-3210',
    },
    // Add more borrowers as needed
  ]);

  // Seed data for User
  const users = await User.create([
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      telePhone: '111-111-1111',
      password: 'password123',
      NIF: '111111111',
    },
    {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      telePhone: '222-222-2222',
      password: 'password456',
      NIF: '222222222',
    },
    // Add more users as needed
  ]);

  // Seed data for Loan
  const loans = await Loan.create([
    {
      loanName: 'Personal Loan 1',
      borrower: '65446bb5539a0b2693c75526', // Borrower _id
      lender: '65446bb5539a0b2693c7552c', // Lender _id
      loanAmount: 5000,
      interestRate: 5.5,
      termOfLoan: 5,
      finalPaymentAmount: 0,
      dateOfIssuance: new Date('2014-02-01'),
      dateOfMaturity: new Date('2019-02-01'),
      numberOfOnTimePayments: 60,
      // Add other loan fields
    },
    {
      loanName: 'Business Loan 1',
      borrower: '65446bb5539a0b2693c75527',
      lender: '65446bb5539a0b2693c7552b',
      loanAmount: 10000,
      interestRate: 6.0,
      termOfLoan: 5,
      finalPaymentAmount:0,
      dateOfIssuance: new Date('2014-02-01'),
      dateOfMaturity: new Date('2019-02-01'),
      numberOfOnTimePayments: 60,
      // Add other loan fields
    },
    // Add more loans as needed
  ]);

  // Seed data for Order
  const orders = await Order.create([
    {
      products: '65446bb5539a0b2693c75526', // Link orders to borrowers (for example)
    },
    // Add more orders as needed
  ]);

  console.log('Seed data created successfully');
  process.exit();
});
