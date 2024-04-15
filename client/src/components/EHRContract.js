import { ethers } from 'ethers';
import CopyrightArtifact from '../artifacts/contracts/EHR.sol/EHR.json';

const contractAddress = "0x17816cD65a95d7C0E1c5090bEEa0b25517e7772b"; // Replace with your deployed contract address

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, CopyrightArtifact.abi, signer);

export const addPatient = async (name, age, sex, description, ipfsHash) => {
  try {
    const tx = await contract.addPatient(name, age, sex, description, ipfsHash);
    const receipt = await tx.wait();
    return receipt.transactionHash;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const getPatientDetails = async (patientAddress) => {
  try {
    const details = await contract.getPatientDetails(patientAddress);
    return {
      name: details[0],
      age: details[1],
      sex: details[2],
      description: details[3],
      ipfsHash: details[4],
    };
  } catch (error) {
    console.error('Error fetching patient details:', error);
    throw error;
  }
};

export const isAdmin = async (address) => {
  try {
    const isAdmin = await contract.isAdmin(address);
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin role:', error);
    throw error;
  }
};

export const isDoctor = async (address) => {
  try {
    const isDoctor = await contract.isDoctor(address);
    return isDoctor;
  } catch (error) {
    console.error('Error checking doctor role:', error);
    throw error;
  }
};

export const isPatient = async (address) => {
  try {
    const isPatient = await contract.isPatient(address);
    return isPatient;
  } catch (error) {
    console.error('Error checking patient role:', error);
    throw error;
  }
};

// Add other contract interaction functions as needed
