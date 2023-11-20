import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_BORROWER_BY_NIF } from '../utils/queries'; // Make sure to import the correct query

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
      {data && data.borrower && (
        <div>
          <h3>Borrower Information</h3>
          <p>NIF: {data.borrower.nif}</p>
          {/* Add other borrower information here */}
        </div>
      )}
    </div>
  );
}

export default GetBorrower;




// import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_BORROWERS } from '../utils/queries'; // Make sure to import the correct query

// function GetBorrowerByNIF() {
//   const [nif, setNIF] = useState('');
//   const { loading, error, data } = useQuery(GET_BORROWERS);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     // Perform logic to find the borrower with the entered NIF
//    try{ const borrower = await data.borrower.find((borrower) => borrower.nif === nif);
//     // try{ const borrower = await data.borrower.find((borrower) => borrower.nif === nif);
//     if (loading) {
//       console.log("loading");
//     }
//     if (error) {
//       throw new Error("something went wrong!");
//     }
//     // Handle logic with the borrower data, e.g., display it in the UI
//     if (borrower) {
//       console.log(borrower);
//       // Update your UI or state with borrower information
//     } 
//   }  catch (err) {
//     console.error(err);
//   }
//   };

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setNIF(value);
//   };

//   return (
//     <div className="container my-1">
//       <h2>Get Borrower by NIF</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div className="flex-row space-between my-2">
//           <label htmlFor="nif">Enter NIF:</label>
//           <input
//             type="text"
//             id="nif"
//             name="nif"
//             value={nif}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="flex-row flex-end">
//           <button type="submit">Get Borrower</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default GetBorrowerByNIF;

