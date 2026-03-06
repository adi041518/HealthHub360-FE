import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { fetchAllDoctors } from "../axios/doctors";
import { fetchAllNurse } from "../axios/nurse";
import { fetchAllPatients } from "../axios/patient";

interface Props {
  formData: any; // original data
  editedFormData: any; // only edited fields
  setEditedFormData: (data: any) => void;
  mode: "create" | "edit" | "view";
}

const AppointmentForm = ({
  formData,
  editedFormData,
  setEditedFormData,
  mode,
}: Props) => {
  const isView = mode === "view";

  const [doctors, setDoctors] = useState<any[]>([]);
  const [nurses, setNurses] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetchAllDoctors().then((res) =>
      setDoctors(res.data.data || [])
    );
    fetchAllNurse().then((res) =>
      setNurses(res.data.data || [])
    );
    fetchAllPatients().then((res) =>
      setPatients(res.data.data || [])
    );
  }, []);

  // 🔥 Get correct value (edited OR original)
  const getValue = (field: string) => {
    return editedFormData[field] !== undefined
      ? editedFormData[field]
      : formData[field] || "";
  };

  // 🔥 Store only edited fields
  const handleChange = (field: string, value: any) => {
    setEditedFormData({
      ...editedFormData,
      [field]: value,
    });
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Patient</Form.Label>
        <Form.Select
          disabled={isView}
          value={getValue("patientId")}
          onChange={(e) =>
            handleChange("patientId", e.target.value)
          }
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.code} value={patient.code}>
              {patient.name} ({patient.code})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Doctor</Form.Label>
        <Form.Select
          disabled={isView}
          value={getValue("doctorId")}
          onChange={(e) =>
            handleChange("doctorId", e.target.value)
          }
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.code} value={doc.code}>
              {doc.name} ({doc.code})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Nurse</Form.Label>
        <Form.Select
          disabled={isView}
          value={getValue("nurseId")}
          onChange={(e) =>
            handleChange("nurseId", e.target.value)
          }
        >
          <option value="">Select Nurse</option>
          {nurses.map((n) => (
            <option key={n.code} value={n.code}>
              {n.name} ({n.code})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          disabled={isView}
          value={getValue("date")}
          onChange={(e) =>
            handleChange("date", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          disabled={isView}
          value={getValue("time")}
          onChange={(e) =>
            handleChange("time", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control
          disabled={isView}
          value={getValue("reason")}
          onChange={(e) =>
            handleChange("reason", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Symptoms</Form.Label>
        <Form.Control
          disabled={isView}
          value={getValue("symptoms")}
          onChange={(e) =>
            handleChange("symptoms", e.target.value)
          }
        />
      </Form.Group>
    </>
  );
};

export default AppointmentForm;