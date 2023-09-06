import axios from 'axios';

export const listCard = async (listing) => {
    const url = 'http://localhost:8081/admin/list-card';
    try {
        const response = await axios.post(
            url,
            {
                listing
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
