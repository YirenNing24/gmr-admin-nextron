import axios from "axios";
import { host
 } from "./config";
export const searchIndex = async () => {
  const url = `http://${host}:8081/admin/search-indexes`;

  try {
    const response = await axios.get(
      url,
      {
      },
      {
        withCredentials: true
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
  };


export const createIndex = async (indexName, primaryKey) => {
    const url = `http://${host}:8081/admin/create-index`;
  
    try {
      const response = await axios.post(
        url,
        { 
          indexName,
          primaryKey
        },
        {
          withCredentials: true
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };


export const deleteIndex = async (indexName) => {
    const url = 'http://localhost:8081/admin/delete-index';
  
    try {
      const response = await axios.delete(
        url,
        { 
          indexName
        },
        {
          withCredentials: true
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };


export const getDocuments = async (indexName) => {
    const url = 'http://localhost:8081/admin/get-documents';

    try {
      const response = await axios.post(
        url,
        { 
          indexName
        },
        {
          withCredentials: true
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
