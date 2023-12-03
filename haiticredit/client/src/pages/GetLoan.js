import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_LOANS } from '../utils/queries';

function GetLoan() {
    const [borrowernif, setBorrowernif] = useState('');
    const [getLoans, { loading, error, data }] = useLazyQuery(GET_LOANS);
    let i = 0;

    const handleFormSubmit = (event) => {
      event.preventDefault();
      getLoans({ variables: { borrowernif: borrowernif} });
    };

console.log(data);
    const handleChange = (event) => {
        const {value} = event.target;
        setBorrowernif(()=>value);
    };

    return (
        <div className="container my-1">
          <h2>Get Loan by Name</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="borrowernif">Enter Loan Name:</label>
              <input
                type="Text"
                id="borrowernif"
                name="borrowernif"
                value={borrowernif}
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end">
              <button type="submit">Get Loan</button>
            </div>
          </form>


          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}


          {data && data.getLoans.map((loan) => {
          i++;
          return (
            <div>
              <h3>Loan Number {i}</h3>
              <p>loanName: {loan.loanName}</p>
              <p>borrower name: {loan.borrower.firstName}</p>
              <p>borrower nif: {loan.borrower.nif}</p>
              <p>user name: {loan.user.firstName}</p>
              <p>user nif: {loan.user.nif}</p>
              <p>loan Amount: ${loan.loanAmount}</p>
              <p>interest Rate: {loan.interestRate}%</p>
              <p>loanAmortizationAmount: ${loan.loanAmortizationAmount}</p>
              <p>termOfLoan: {loan.termOfLoan}</p>
              <p>dateOfIssuance: {loan.dateOfIssuance}</p>
              <p>dateOfMaturity: {loan.dateOfMaturity}</p>
            </div>
          );
          })
          }
        </div>
      );
}

export default GetLoan;
