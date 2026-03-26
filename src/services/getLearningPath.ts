import api from "./api";

export const getLearningPath = async (id: any) => {
  try {
    const response = await api.get(`/learning-path/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
