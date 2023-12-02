import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BORROWER_BY_NIF } from '../utils/queries';

function GetBorrower() {
  const [nif, setNIF] = useState('');
  const [getBorrower, { loading, error, data }] = useLazyQuery(GET_BORROWER_BY_NIF);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the query with the entered NIF
    getBorrower({ variables: { borrowernif: nif } });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    // Use the callback version of setNIF to ensure the latest value is used
    setNIF(() => value);
  };

  return (
    <div className="container my-1">
      <h2>Get Borrower by NIF</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="nif">Enter NIF:</label>
          <input
            type="text"
            id="nif"
            name="nif"
            value={nif}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Get Borrower</button>
        </div>
      </form>

      {/* Display loading or error messages */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Display borrower information */}
      {data && data.getBorrower && (
        <div>
          <h3>Borrower Information</h3>
          <p>NIF: {data.getBorrower.nif}</p>
          <p>First Name: {data.getBorrower.firstName}</p>
          <p>Last Name: {data.getBorrower.lastName}</p>
          <p>Email: {data.getBorrower.email}</p>
          <p>Address: {data.getBorrower.addressStreet}</p>
          <p>Phone: {data.getBorrower.telePhone}</p>
        </div>
      )}
    </div>
  );
}

export default GetBorrower;
