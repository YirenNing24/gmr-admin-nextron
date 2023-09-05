import axios from 'axios';

export const createCard = async (metadata, supply, base64Image, uploader, editionAddress) => {
    const url = 'http://localhost:8081/admin/create-card';
    try {
        const response = await axios.post(
            url,
            {
                metadata,
                supply,
                base64Image,
                uploader,
                editionAddress
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
