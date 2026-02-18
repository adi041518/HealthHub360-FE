import axiosInstance from "../axios/axios.ts";
 
export const loginApi = (data: any) => {
    return axiosInstance.post("/login", data);
};
 
export const resetPasswordApi = (payload: any) => {
    return axiosInstance.post("/reset-password", payload);
};
 
export const forgotPasswordApi = (payload: any) => {
    return axiosInstance.post("/forgot-password", payload)
}