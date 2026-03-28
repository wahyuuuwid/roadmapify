import api from "../api";


export const saveProgress = async (data: any) => {
    try {
        const response = await api.post(`/user/save-progress`, {
            learning_path_id: data.learningPathID,
            completed_chapters: data.completedChapters
        });
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
}