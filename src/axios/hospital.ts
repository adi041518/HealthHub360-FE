import axiosPrivate from "./axiosprivate"

export const fetchAllHospital = () => {
    return axiosPrivate.get("/hospital/fetchAll")
}
 