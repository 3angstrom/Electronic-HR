import './App.css';
import React, { useEffect, useState } from 'react';
import CopyrightArtifact from "../src/artifacts/contracts/EHR.sol/EHR.json";
import { ethers } from "ethers";
// import web3 from web3;

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [role, setRole] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctorInfoHash, setDoctorInfoHash] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientSex, setPatientSex] = useState("");
  const [patientDescription, setPatientDescription] = useState("");
  const [patientIpfsHash, setPatientIpfsHash] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);





          //"0x126a3e361B49Bb6c2A79503306E5B2b512ca76A4"





          const contractAddress = "0x126a3e361B49Bb6c2A79503306E5B2b512ca76A4";
          const contract = new ethers.Contract(
            contractAddress,
            CopyrightArtifact.abi,
            signer
          );

          console.log(contract);
          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error loading provider:", error);
        }
      } else {
        console.log("Metamask not detected");
      }
    };

    loadProvider();
  }, []);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleAddDoctor = async () => {
    try {
      await contract.addDoctor(doctorId, doctorInfoHash);
      console.log("Doctor added successfully");
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const handleAddPatient = async () => {
    try {
      await contract.addPatient(
        patientName,
        patientAge,
        patientSex,
        patientDescription,
        patientIpfsHash
      );
      console.log("Patient added successfully");
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleGetAllPatients = async () => {
    try {
      const patientIds = await contract.getAllPatients();
      setPatients(patientIds);
    } catch (error) {
      console.error("Error getting all patients:", error);
    }
  };

  return (
    <div className="App">
      <h1>Blockchain EHR</h1>
      <p>Account: {account ? account : "Connect with MetaMask"}</p>

      {account && (
        <div>
          <h2>Select Your Role</h2>
          <button onClick={() => handleRoleSelection("admin")}>Admin</button>
          <button onClick={() => handleRoleSelection("doctor")}>Doctor</button>
        </div>
      )}

      {role === "admin" && (
        <div>
          <h2>Admin View</h2>
          <h3>Add Doctor</h3>
          <input
            type="text"
            placeholder="Doctor Address"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Doctor Info Hash"
            value={doctorInfoHash}
            onChange={(e) => setDoctorInfoHash(e.target.value)}
          />
          <button onClick={handleAddDoctor}>Add Doctor</button>

          <h3>View All Patients</h3>
          <button onClick={handleGetAllPatients}>Get All Patients</button>
          <ul>
            {patients.map((patientId, index) => (
              <li key={index}>{patientId}</li>
            ))}
          </ul>
        </div>
      )}

      {role === "doctor" && (
        <div>
          <h2>Doctor View</h2>
          <h3>Add Patient</h3>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Patient Age"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Patient Sex"
            value={patientSex}
            onChange={(e) => setPatientSex(e.target.value)}
          />
          <input
            type="text"
            placeholder="Patient Description"
            value={patientDescription}
            onChange={(e) => setPatientDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Patient IPFS Hash"
            value={patientIpfsHash}
            onChange={(e) => setPatientIpfsHash(e.target.value)}
          />
          <button onClick={handleAddPatient}>Add Patient</button>
        </div>
      )}
    </div>
  );
}

export default App;
