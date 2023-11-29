import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_LOANS } from '../utils/queries'; 

function GetLoan() {
    const [borrowernif, setBorrowernif] = useState('');
    const [getLoans, { loading, error, data }] = useLazyQuery(GET_LOANS);
  
    // const handleFormSubmit = (event) => {
    //   event.preventDefault();
    //   getLoans({ variables: { loanName } });
    // };
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
          

          {data && data.loan && (
            <div>
              <h3>Loan Information</h3>
              <p>loanName: {data.loan.loanName}</p>
            </div>
          )}
        </div>
      );
}

export default GetLoan;