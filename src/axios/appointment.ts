import axiosPrivate from "./axiosPrivate";

export const fetchAllAppointments = () => {
  return axiosPrivate.get("/appointment/fetchAll");
};

export const createAppointment = (
  doctorId: string,
  nurseId: string,
  payload: any
) => {
  return axiosPrivate.post(
    `/appointment/create/${doctorId}/${nurseId}`,
    payload
  );
};

export const fetchAppointmentById = (appointmentId: string) => {
  return axiosPrivate.get(`/appointment/fetch/${appointmentId}`);
};

export const updateAppointmentById = (
  appointmentId: string,
  payload: any
) => {
  return axiosPrivate.patch(
    `/appointment/update/${appointmentId}`,
    payload
  );
};

export const deleteAppointmentById = (appointmentId: string) => {
  return axiosPrivate.delete(
    `/appointment/delete/${appointmentId}`
  );
};