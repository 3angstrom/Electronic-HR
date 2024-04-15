import React, { useState } from 'react';
import { addPatient } from './EHRContract';
import { addFileToIPFS } from '../IPFS';

function Patient({ account }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert patient information to a JSON string
      const patientInfo = JSON.stringify({
        name,
        age,
        sex,
        description,
      });

      // Upload patient information to IPFS
      const ipfsHash = await addFileToIPFS(patientInfo);

      // Add patient to the smart contract
      const txHash = await addPatient(name, age, sex, description, ipfsHash);
      console.log('Patient added to the contract with transaction hash:', txHash);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sex:</label>
          <input
            type="text"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}

export default Patient;
