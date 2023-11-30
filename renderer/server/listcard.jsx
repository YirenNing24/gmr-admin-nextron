import axios from 'axios';
import { host } from './config';

export const listCard = async (listing) => {
    const url = `http://${host}:8081/admin/list-card`;
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
