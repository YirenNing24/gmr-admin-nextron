import axios from "axios";
import { host } from "./config";

export const login = async (username, password) => {
  const url = `http://${host}:8081/admin/login`;

  try {
    const response = await axios.post(
      url,
      {
        username,
        password
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


export const logout = async () => {
  const url = `http://${host}:8081/admin/logout`;
  try {
      const response = await axios.get(
          url,
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