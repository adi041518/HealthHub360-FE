import axiosPrivate from "./axiosPrivate"

export const fetchAllReceptionist = () => {
    return axiosPrivate.get("/receptionist/fetchAll")
}
 