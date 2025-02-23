import { smartAPI } from "../components/helpers/constants";

export const GetAllQuestion = async (token) => {
    try {
        const response = await fetch(`${smartAPI}/deal/forums/questions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Lỗi ${response.status}: ${errorText}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error("Lỗi khi lấy post:", error.message);
        return `Lỗi: ${error.message}`;
    }
};

