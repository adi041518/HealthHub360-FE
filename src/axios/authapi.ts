import axiosPublic from "./axiosPublic.ts";
import axiosPrivate from "./axiosPrivate.ts";
export const loginApi = (data: any) => {
    return axiosPublic.post("/login", data);
};
 
export const resetPasswordApi = (payload: any) => {
    return axiosPrivate.post("/reset-password", payload);
};
 
export const forgotPasswordApi = (payload: any) => {
    return axiosPublic.post("/forgot-password", payload)
}
export const rolesApi=(payload:any)=>{
    return axiosPrivate.post("/role/create",payload)
}
export const fetchAllRolesApi=()=>{
    return axiosPrivate.get("/role/fetchAll")
}

export const deleteRoleByIdApi=(roleCode:string)=>{
    return axiosPrivate.delete(`/role/delete/${roleCode}`)
}

export const fetchRoleByIdApi=(roleCode:string)=>{
    return axiosPrivate.get(`/role/fetch/${roleCode}`)
}