import axiosPrivate from "./axiosPrivate"
 
export const fetchAllMedicines = () => {
    return axiosPrivate.get("/medicine/fetchAll")
}
 