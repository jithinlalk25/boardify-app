import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";

interface LoginInitiateResponse {
  message: string;
}

interface LoginVerifyResponse {
  token: string;
}

const BASE_URL = "http://192.168.1.7:3000";

export interface UserProfile {
  _id: string;
  email: string;
  instituteId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export const authApi = {
  initiateLogin: async (email: string): Promise<LoginInitiateResponse> => {
    const response = await axios.post(
      `${BASE_URL}/member-app/login/initiate`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  },

  verifyOtp: async (
    email: string,
    otp: string
  ): Promise<LoginVerifyResponse> => {
    const response = await axios.post(
      `${BASE_URL}/member-app/login/verify`,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  },
};

export const api = {
  getUserProfile: async (token: string): Promise<UserProfile> => {
    const response = await axios.get(`${BASE_URL}/member-app/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getNotices: async () => {
    const token = await tokenStorage.getToken();
    const response = await axios.get(`${BASE_URL}/notice-app`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getNoticeById: async (id: string) => {
    const token = await tokenStorage.getToken();
    const response = await axios.get(`${BASE_URL}/notice-app/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  registerPushToken: async (expoPushToken: string) => {
    const token = await tokenStorage.getToken();
    const response = await axios.post(
      `${BASE_URL}/member-app/push-token`,
      { expoPushToken },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
