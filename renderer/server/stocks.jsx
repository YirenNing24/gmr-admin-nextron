import axios from "axios";

export const updateCardList = async (editionAddress) => {
  const url = 'http://localhost:8081/admin/card-list-update';
  try {
    const response = await axios.put(url, {
      withCredentials: true,
      editionAddress
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


export const cardListPosted = async () => {
  const url = 'http://localhost:8081/admin/card-list-posted';
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


export const cardListSold = async () => {
  const url = 'http://localhost:8081/admin/card-list-sold';
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

