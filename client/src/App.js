import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import CopyrightArtifact from "../src/artifacts/contracts/EHR.sol/EHR.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import { create } from 'ipfs-http-client';

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
  const [ipfsHash, setIpfsHash] = useState("");
  const [patients, setPatients] = useState([]);

  const ipfs = create('https://ipfs.infura.io:5001/api/v0');

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

          const contractAddress = "0xCA6bDA64E427d8e6C45B49518f3A13a44C3101e4";
          const contract = new ethers.Contract(
            contractAddress,
            CopyrightArtifact.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error loading provider:", error);
        }
      } else {
        console.log("MetaMask not detected");
      }
    };

    loadProvider();
  }, []);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    try {
      const added = await ipfs.add(file);
      const hash = added.cid.toString();
      setIpfsHash(hash);
      console.log(`IPFS hash: ${hash}`);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
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
        ipfsHash
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
    <div className="container mt-5">
      <h1 className="text-center">Blockchain EHR</h1>
      <p>Account: {account ? account : "Connect with MetaMask"}</p>

      {account && (
        <div>
          <h2 className="text-center">Select Your Role</h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mx-2" onClick={() => handleRoleSelection("admin")}>Admin</button>
            <button className="btn btn-primary mx-2" onClick={() => handleRoleSelection("doctor")}>Doctor</button>
          </div>
        </div>
      )}

      {role === "admin" && (
        <div className="mt-5">
          <h2 className="text-center">Admin View</h2>
          <div className="row">
            <div className="col-md-6">
              <h3>Add Doctor</h3>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Doctor Address"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Doctor Info Hash"
                value={doctorInfoHash}
                onChange={(e) => setDoctorInfoHash(e.target.value)}
              />
              <button className="btn btn-success" onClick={handleAddDoctor}>Add Doctor</button>
            </div>
            <div className="col-md-6">
              <h3>View All Patients</h3>
              <button className="btn btn-info mb-3" onClick={handleGetAllPatients}>Get All Patients</button>
              <ul className="list-group">
                {patients.map((patientId, index) => (
                  <li key={index} className="list-group-item">{patientId}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {role === "doctor" && (
        <div className="mt-5">
          <h2 className="text-center">Doctor View</h2>
          <div className="col-md-6 mx-auto">
            <h3>Add Patient</h3>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Patient Age"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Patient Sex"
              value={patientSex}
              onChange={(e) => setPatientSex(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Patient Description"
              value={patientDescription}
              onChange={(e) => setPatientDescription(e.target.value)}
            />
            <input
              type="file"
              className="form-control mb-2"
              onChange={handleFileUpload}
            />
            <button className="btn btn-success" onClick={handleAddPatient}>Add Patient</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
