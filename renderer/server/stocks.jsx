import axios from "axios";

export const updateCardList = async () => {
  const url = 'http://localhost:8081/admin/card-list-update';
  try {
    const response = await axios.put(url, {
      withCredentials: true
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


export const cardListAll = async () => {
  const url = 'http://localhost:8081/admin/card-list-all';
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
