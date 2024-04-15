import React, { useState, useEffect } from 'react';
import { getPatientDetails } from './EHRContract';

function Doctor({ account }) {
  const [patientAddress, setPatientAddress] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const details = await getPatientDetails(patientAddress);
      setPatientDetails(details);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleInputChange = (e) => {
    setPatientAddress(e.target.value);
  };

  return (
    <div>
      <h2>Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Address:</label>
          <input
            type="text"
            value={patientAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Fetch Patient Details</button>
      </form>
      {patientDetails && (
        <div>
          <h3>Patient Details</h3>
          <p>Name: {patientDetails.name}</p>
          <p>Age: {patientDetails.age}</p>
          <p>Sex: {patientDetails.sex}</p>
          <p>Description: {patientDetails.description}</p>
          <p>IPFS Hash: {patientDetails.ipfsHash}</p>
        </div>
      )}
    </div>
  );
}

export default Doctor;
