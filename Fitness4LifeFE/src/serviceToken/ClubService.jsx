import { dashboardAPI } from "../components/helpers/constants";


export const fetchAllClubs = async (token) => {
    try {
        const response = await fetch(`${dashboardAPI}/dashboard/clubs`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Chuyển response thành JSON
        // console.log("Dữ liệu nhận được: ", data);
        return data;
    } catch (error) {
        console.error("Lỗi khi fetch dữ liệu: ", error);

        if (error.response) {
            return error.response.data || 'An error occurred';
        } else {
            return error.message || 'An unexpected error occurred';
        }
    }
};
