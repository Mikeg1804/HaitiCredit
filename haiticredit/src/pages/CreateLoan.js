  import React, { useState, useEffect, useContext } from 'react';
  import { Link } from 'react-router-dom';
  import { useMutation, useQuery } from '@apollo/client';
  import { CREATE_LOAN } from '../utils/mutations';
  import { GET_BORROWER_BY_NIF } from '../utils/queries';
  // import { useApolloUploadClient } from 'apollo-upload-client';
  import { useUserContext, } from '../utils/userContext';


  function CreateLoan() {
    const { currentUserNIF, setUser } = useUserContext();

    const [formState, setFormState] = useState({
      loanName: '',
      loanAmount: 0,
      interestRate: 0,
      loanAmortizationAmount: 0,
      termOfLoan: 0,
      finalPaymentAmount: 0,
      dateOfIssuance: '',
      dateOfMaturity: '',
      numberOfOnTimePayments: 0,
      dateOfMissedPayment: '',
      dateOfPaymentRemedied: '',
      supportingDocumentation: '',
      borrowerNIF: '', 
    });

    const [borrower, setBorrower] = useState(null);

    const { loading, error, data } = useQuery(GET_BORROWER_BY_NIF, {
      variables: { borrowerNIF: formState.borrowerNIF },
      skip: !formState.borrowerNIF,
    });
  
    useEffect(() => {
      if (data && data.getBorrowerByNIF) {
        setBorrower(data.getBorrowerByNIF);
      }
    }, [data]);

    const [createLoan] = useMutation(CREATE_LOAN);

    const handleFormSubmit = async (event) => {
      event.preventDefault();

   

      const mutationResponse = await createLoan({
        variables: {
          loanName: formState.loanName,
          loanAmount: formState.loanAmount,
          interestRate: formState.interestRate,
          loanAmortizationAmount: formState.loanAmortizationAmount,
          termOfLoan: formState.termOfLoan,
          finalPaymentAmount: formState.finalPaymentAmount,
          dateOfIssuance: formState.dateOfIssuance,
          dateOfMaturity: formState.dateOfMaturity,
          numberOfOnTimePayments: formState.numberOfOnTimePayments,
          dateOfMissedPayment: formState.dateOfMissedPayment,
          dateOfPaymentRemedied: formState.dateOfPaymentRemedied,
          supportingDocumentation: formState.supportingDocumentation,
          borrowerId: borrower ? borrower._id : null,
          userNIF: currentUserNIF,
          
        },
      });

      console.log(mutationResponse);

      // Handle any further logic or redirect as needed after creating the loan
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    };
    
    return (
      <div className="container my-1">
        <Link to="/createloan">← Go back</Link>
        <h2>Create New Loan</h2>
        <form onSubmit={handleFormSubmit}>
     
          <div className="flex-row space-between my-2">
            <label htmlFor="loanName">Loan Name:</label>
            <input
              type="text"
              id="loanName"
              name="loanName"
              value={formState.loanName}
              onChange={handleChange}
            />
            <label htmlFor="loanAmount">Loan Amount:</label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formState.loanAmount}
              onChange={handleChange}
            />
            <label htmlFor="interestRate">Interest Rate:</label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              value={formState.interestRate}
              onChange={handleChange}
            />  
            <label htmlFor="loanAmortizationAmount">Loan Amortization Amount:</label>
            <input
              type="number"
              id="loanAmortizationAmount"
              name="loanAmortizationAmount"
              value={formState.loanAmortizationAmount}
              onChange={handleChange}
            />   
            <label htmlFor="termOfLoan">Term of Loan:</label>
            <input
              type="number"
              id="termOfLoan"
              name="termOfLoan"
              value={formState.termOfLoan}
              onChange={handleChange}
            /> 
     
            <label htmlFor="finalPaymentAmount">FinalPayment Amount:</label>
            <input
              type="number"
              id="finalPaymentAmount"
              name="finalPaymentAmount"
              value={formState.finalPaymentAmount}
              onChange={handleChange}
            />  
            <label htmlFor="dateOfIssuance">Date of Issuance:</label>
            <input
              type="date"
              id="dateOfIssuance"
              name="dateOfIssuance"
              value={formState.dateOfIssuance}
              onChange={handleChange}
            />
            <label htmlFor="dateOfMaturity">Date of Maturity:</label>
            <input
              type="date"
              id="dateOfMaturity"
              name="dateOfMaturity"
              value={formState.dateOfMaturity}
              onChange={handleChange}
            /> 
            <label htmlFor="numberOfOnTimePayments">Number of Ontime Payments:</label>
            <input
              type="number"
              id="numberOfOnTimePayments"
              name="numberOfOnTimePayments"
              value={formState.numberOfOnTimePayments}
              onChange={handleChange}
            /> 
            <label htmlFor="dateOfMissedPayment">Last Date of Missed Payment:</label>
            <input
              type="date"
              id="dateOfMissedPayment"
              name="dateOfMissedPayment"
              value={formState.dateOfMissedPayment}
              onChange={handleChange}
            /> 
            <label htmlFor="dateOfPaymentRemedied">Date Missed Payment was Remedied:</label>
            <input
              type="date"
              id="dateOfPaymentRemedied"
              name="dateOfPaymentRemedied"
              value={formState.dateOfPaymentRemedied}
              onChange={handleChange}
            /> 
          <label htmlFor="supportingDocumentation">Supporting Documentation:</label>
          <input
              type="file"
              id="supportingDocumentation"
              name="supportingDocumentation"
              onChange={handleFileChange}
            />                                                             
          </div>

          <div className="flex-row space-between my-2">
          <label htmlFor="borrowerNIF">Borrower NIF:</label>
          <input
            type="text"
            id="borrowerNIF"
            name="borrowerNIF"
            value={formState.borrowerNIF}
            onChange={handleChange}
          />
        </div>
          <div className="flex-row flex-end">
            <button type="submit">Create Loan</button>
          </div>
        </form>
      </div>
    );
  }

  export default CreateLoan;
