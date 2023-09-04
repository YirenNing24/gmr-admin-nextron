import axios from 'axios';

export const listCard = async (metadata) => {
    const url = 'http://localhost:8081/admin/list-card';
    try {
        const response = await axios.post(
            url,
            {
                metadata,
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
