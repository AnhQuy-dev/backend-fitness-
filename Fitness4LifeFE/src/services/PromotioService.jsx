import axios from "axios";
import { smartAPI } from "../components/helpers/constants";


export const findCode = async (promotionCode, userId) => {
    try {
        const response = await axios.get(`${smartAPI}/promotionOfUser/${promotionCode}/${userId}`)
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred'
        } else {
            return error.message || 'An unexpected error occurred'
        }
    }
};

export const UsedPromotionCode = async (code, userId) => {
    try {
        const response = await axios.post(`${smartAPI}/promotionOfUser/usedCode/${userId}?promotionCode=${code}`);
        return response;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred';
        } else {
            return error.message || 'An unexpected error occurred';
        }
    }
};


export const usedPointChangCode = async (userId, point, promotionId) => {
    try {
        const response = await axios.post(`${smartAPI}/promotionOfUser/usedPointChangCode/${userId}?point=${point}&promotionId=${promotionId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data || 'An error occurred';
        } else {
            return error.message || 'An unexpected error occurred';
        }
    }
};



