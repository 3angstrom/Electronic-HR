import React, { useState, useEffect } from 'react';
import { getFileFromIPFS } from '../IPFS';

function Admin() {
  const [patientData, setPatientData] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFileFromIPFS(ipfsHash);
        setPatientData(JSON.parse(data));
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    if (ipfsHash) {
      fetchData();
    }
  }, [ipfsHash]);

  const handleInputChange = (e) => {
    setIpfsHash(e.target.value);
  };

  return (
    <div>
      <h2>Admin</h2>
      <div>
        <label>IPFS Hash:</label>
        <input
          type="text"
          value={ipfsHash}
          onChange={handleInputChange}
          placeholder="Enter IPFS Hash"
        />
      </div>
      {patientData && (
        <div>
          <h3>Patient Data</h3>
          <p>Name: {patientData.name}</p>
          <p>Age: {patientData.age}</p>
          <p>Sex: {patientData.sex}</p>
          <p>Description: {patientData.description}</p>
        </div>
      )}
    </div>
  );
}

export default Admin;