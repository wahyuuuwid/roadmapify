import api from "../api";

export const getAllLearningPaths = async () => {
  try {
    const response = await api.get(`/dashboard/learning-paths`);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};