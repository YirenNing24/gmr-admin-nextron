import axios from "axios";
import { host } from "./config";

export const updateContracts = async (contracts) => {
  const url = `http://${host}:8081/admin/update-contracts`;
  try {
    const response = await axios.post(url, contracts, {
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
    const url = `http://${host}:8081/admin/contracts`;
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