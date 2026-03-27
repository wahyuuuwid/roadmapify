import api from "../api";

export const RegisterService = async (data: any) => {
    try {
        const response = await api.post("/register", data);
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};