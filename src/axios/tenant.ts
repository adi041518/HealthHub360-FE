import axiosPrivate from "./axiosPrivate"

export const fetchAllTenants = () => {
    return axiosPrivate.get("/tenant/fetchAll")
} 