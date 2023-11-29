import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_BORROWER } from '../utils/mutations'; 

function CreateBorrower() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    nif: '',
    dateofBirth: '',
    addressStreet: '',
    addressCity: '',
    addressDepartment: '',
    telePhone: '',
  });
  const [createBorrower] = useMutation(CREATE_BORROWER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await createBorrower({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        nif: formState.nif,
        dateofBirth: formState.dateofBirth,
        addressStreet: formState.addressStreet,
        addressCity: formState.addressCity,
        addressDepartment: formState.addressDepartment,
        telePhone: formState.telePhone,
      },
    });

    console.log(mutationResponse);

    // Handle any further logic or redirect as needed after creating the borrower
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/createborrower">← Go back</Link>
      <h2>Create New Borrower</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="firstName"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="lastName"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="nif">NIF:</label>
          <input
            type="nif"
            id="nif"
            name="nif"
            value={formState.nif}
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="dateofBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateofBirth"
            name="dateofBirth"
            value={formState.dateofBirth}
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="addressStreet">Address Street</label>
          <input
            type="addressStreet"
            id="addressStreet"
            name="addressStreet"
            value={formState.addressStreet}
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="addressCity">Address City</label>
          <input
            type="addressCity"
            id="addressCity"
            name="addressCity"
            value={formState.addressCity}
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="addressDepartment">Address Department</label>
          <input
            type="addressDepartment"
            id="addressDepartment"
            name="addressDepartment"
            value={formState.addressDepartment}
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="telePhone">TelePhone</label>
          <input
            type="telePhone"
            id="atelePhone"
            name="telePhone"
            value={formState.telePhone}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Create Borrower</button>
        </div>
      </form>
    </div>
  );
}

export default CreateBorrower;
