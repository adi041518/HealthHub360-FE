import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

import PatientForm from "./patientForm";
import AppointmentForm from "./appointmentForm";

import {
  createPatient,
  updatePatientById,
  fetchPatientById,
} from "../axios/patient";

import {
  createAppointment,
  updateAppointmentById,
  fetchAppointmentById,
} from "../axios/appointment";

interface Props {
  show: boolean;
  module: "patient" | "appointment";
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: () => void;
  initialData?: any;
}

const ReceptionistModuleFormModal = ({
  show,
  module,
  mode,
  onClose,
  onSubmit,
  initialData,
}: Props) => {
  const isView = mode === "view";

  const [formData, setFormData] = useState<any>({});
  const [editedFormData, setEditedFormData] = useState<any>({});

  useEffect(() => {
    if (!show) return;

    const loadData = async () => {
      try {
        if ((mode === "edit" || mode === "view") && initialData?.code) {
          if (module === "patient") {
            const res = await fetchPatientById(initialData.code);
            setFormData(res.data.data);
            setEditedFormData({});
          }

          if (module === "appointment") {
            const res = await fetchAppointmentById(initialData.code);
            setFormData(res.data.data);
            setEditedFormData({});
          }
        } else {
          if (module === "patient") {
            setFormData({ roleCode: "R0008" });
          }

          if (module === "appointment") {
            setFormData({ roleCode: "R0009" });
          }

          setEditedFormData({});
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    loadData();
  }, [show, mode, module, initialData]);

  const handleSubmit = async () => {
    try {
      // CREATE MODE
      if (mode === "create") {
        const finalData = { ...formData, ...editedFormData };

        if (module === "patient") {
          await createPatient(finalData);
        }

        if (module === "appointment") {
          await createAppointment(
            finalData.doctorId,
            finalData.nurseId,
            finalData
          );
        }
      }
      // EDIT MODE
      if (mode === "edit") {
        if (Object.keys(editedFormData).length === 0) {
          alert("No changes made");
          return;
        }

        if (module === "patient") {
          await updatePatientById(
            formData.code,
            editedFormData
          );
        }

        if (module === "appointment") {
          await updateAppointmentById(
            formData.code,
            editedFormData
          );
        }
      }

      onSubmit();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode.toUpperCase()} {module.toUpperCase()}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {module === "patient" && (
            <PatientForm
              formData={formData}
              editedFormData={editedFormData}
              setEditedFormData={setEditedFormData}
              mode={mode}
            />
          )}

          {module === "appointment" && (
            <AppointmentForm
              formData={formData}
              editedFormData={editedFormData}
              setEditedFormData={setEditedFormData}
              mode={mode}
            />
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        {!isView && (
          <Button variant="primary" onClick={handleSubmit}>
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ReceptionistModuleFormModal;