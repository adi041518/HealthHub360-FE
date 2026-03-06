import axiosPrivate from "./axiosPrivate";
export const fetchAllBills=()=>{
    return axiosPrivate.get(`bill/fetchAll`)
}
export const createBill=(patientId:string)=>{
    return axiosPrivate.post(`bill/create/${patientId}`)
}
export const deleteBill=(billId:string)=>{
    return axiosPrivate.delete(`bill/delete/${billId}`)
}