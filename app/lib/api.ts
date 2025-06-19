// lib/api.ts
import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
} from "axios";

import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { getAccessToken, getRefreshToken, removeTokens, setTokens } from "./tokenStorage";
import { access } from "fs";
import { config } from "@/config";
import { refreshToken } from "./auth";

const api: AxiosInstance = axios.create({
    //   baseURL: process.env.API_BASE_URL,
    baseURL: config.url.API_URL,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        config.headers["X-API-Key"] = `d0479a07-05d2-4b72-afd6-e5bbc39030fd`;

        if (token) {
            console.log("token", token)
            config.headers["Authorization"] = `Bearer ${token}`;
            // console.log("bearer in API.ts:", token);
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("intercepted response", response);
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };
        console.log("error in API.ts:", error);

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshTokenString = getRefreshToken();
                // console.log("refresh token in action", refreshTokenString)
                if (!refreshTokenString) throw new Error("No refresh token available");

                const { access, refresh } =
                    await refreshToken(refreshTokenString);

                setTokens(access, refresh);

                if (originalRequest.headers) {
                    originalRequest.headers["Authorization"] = `Bearer ${access}`;
                }
                return api(originalRequest);
            } catch (refreshError) {
                removeTokens();
                // Redirect to login page or handle the error
                console.log("refreshError", refreshError)
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;

// export const fetcher = (url: string) =>
//   api.get(url).then((res) => {
//     console.log(res);
//     return res.data.data;
//   });

// Fetcher for GET requests
export const fetcher = async <T = any>(url: string): Promise<T> => {
    const res = await api.get<{ data: T }>(url);
    console.log(res);
    return res.data.data;
};

// Generic request function for mutations
const apiRequest = async <T = any>(
    url: string,
    { arg }: { arg: AxiosRequestConfig }
): Promise<T> => {
    const response: AxiosResponse<{ data: T }> = await api(url, arg);
    return response.data.data;
};

// Custom hook for GET requests
export function useApiGet<Data = any, Error = any>(
    url: string | null,
    config?: SWRConfiguration<Data, Error>
) {
    return useSWR<Data, Error>(url, fetcher, config);
}

// Custom hook for mutations (POST, PUT, DELETE, etc.)
export function useApiMutation<Data = any, Error = any>(
    url: string,
    config?: SWRMutationConfiguration<Data, Error, string, AxiosRequestConfig>
) {
    return useSWRMutation<Data, Error, string, AxiosRequestConfig>(
        url,
        apiRequest,
        config
    );
}

