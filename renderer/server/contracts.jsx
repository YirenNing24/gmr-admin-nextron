import axios from "axios";

export const updateContracts = async (contracts) => {
  const url = 'http://localhost:8081/admin/update-contracts';
  try {
    const response = await axios.put(url, contracts, {
      withCredentials: true
    });

        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
  }
};


export const contracts = async () => {
    const url = 'http://localhost:8081/admin/contracts';
    try {
      const response = await axios.get(url, {
        withCredentials: true
      });
  
          console.log("Response:", response.data);
          return response.data;
      } catch (error) {
          console.error("Error:", error);
          throw error;
    }
  };