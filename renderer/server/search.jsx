import axios from "axios";

export const searchIndex = async () => {
  const url = 'http://localhost:8081/admin/search-indexes';

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