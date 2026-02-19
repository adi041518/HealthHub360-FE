import axiosPrivate from "./axiosprivate"

export const fetchAllTenants = () => {
    return axiosPrivate.get("/tenant/fetchAll")
} 