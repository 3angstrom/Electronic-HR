import { create } from 'ipfs-http-client';

// Create an IPFS HTTP client instance
const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http',
});

export const addFileToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    return added.cid.toString();
  } catch (error) {
    console.error('Error adding file to IPFS:', error);
    throw error;
  }
};

export const getFileFromIPFS = async (cid) => {
  try {
    const file = await ipfs.cat(cid);
    const data = new TextDecoder().decode(file);
    return data;
  } catch (error) {
    console.error('Error fetching file from IPFS:', error);
    throw error;
  }
};
