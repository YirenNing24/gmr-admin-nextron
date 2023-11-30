import axios from 'axios';
import { host } from './config';

export const createCard = async (metadata, supply, base64Image, uploader, editionAddress) => {
    const url = `http://${host}:8081/admin/create-card`;
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


export const createPack = async (data, base64, cardFields, uploader, packAddress) => {
    const url = `http://${host}:8081/admin/create-card-box`;
    try {
        const response = await axios.post(
            url,
            {
                data, 
                base64, 
                cardFields, 
                uploader, 
                packAddress
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
