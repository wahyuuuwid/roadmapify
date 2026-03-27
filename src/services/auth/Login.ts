import api from "../api";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: any;
}

export const LoginService = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data; 
  } catch (error: any) {
    throw {
      success: false,
      message: error.response?.data?.message || "Login gagal. Silakan coba lagi."
    };
  }
};