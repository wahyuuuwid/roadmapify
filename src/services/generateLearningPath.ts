import api from "./api";

export const generateLearningPath = async (topicData: any) => {
  try {
    const response = await api.post("/api/v1/generate", {
        topic: topicData
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
