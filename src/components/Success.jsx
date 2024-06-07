// import React from 'react';
import './success.css'
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  const { formData } = state || {};

  if (!formData) {
    return <p>No form data found</p>;
  }

  return (
      <div className="container">
      <h1 className="title">Form Submitted Successfully</h1>
      <div className="field">
        <p>First Name: {formData.firstName}</p>
        <p>Last Name: {formData.lastName}</p>
        <p>Username: {formData.username}</p>
        <p>Email: {formData.email}</p>
        <p>Phone No: {formData.phoneNo}</p>
        <p>Country: {formData.country}</p>
        <p>City: {formData.city}</p>
        <p>PAN No: {formData.panNo}</p>
        <p>Aadhar No: {formData.aadharNo}</p>
        <Link to="/">Go back to the form</Link>
        </div>
     </div>
  );
};

export default Success;
