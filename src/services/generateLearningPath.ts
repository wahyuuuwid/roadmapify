import { toast } from "sonner";
import api from "./api";

export const generateLearningPath = async (topicData: any) => {
  try {
    const user = localStorage.getItem("user");
    const userObj = user ? JSON.parse(user) : null;
    const response = await api.post("/generate", {
        topic: topicData,
        userID: userObj?.id || ""
    });
    return response.data;
  } catch (error: any) {
    toast.error('Terjadi kesalahan, silahkan coba lagi.');
    // console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
