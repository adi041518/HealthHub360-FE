import { useEffect } from "react";
import { Form } from "react-bootstrap";

interface Props {
  formData: any; // original data
  editedFormData: any; // changed data only
  setEditedFormData: (data: any) => void;
  mode: "create" | "edit" | "view";
}

const PatientForm = ({
  formData,
  editedFormData,
  setEditedFormData,
  mode,
}: Props) => {
  const isView = mode === "view";

  const getValue = (field: string) => {
    return editedFormData[field] !== undefined
      ? editedFormData[field]
      : formData[field] || "";
  };

  const handleChange = (field: string, value: any) => {
    setEditedFormData({
      ...editedFormData,
      [field]: value,
    });
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const age = calculateAge(getValue("dob"));
  const isMinor = age < 18;

  const baseGuardians =
    editedFormData.guardians ?? formData.guardians ?? [];

  const addGuardian = () => {
    const updated = [
      ...baseGuardians,
      {
        name: "",
        dob: "",
        phoneNo: "",
        email: "",
        govtId: "",
        relation: "",
        roleCode: "R0009",
      },
    ];

    handleChange("guardians", updated);
  };

  const updateGuardian = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...baseGuardians];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    handleChange("guardians", updated);
  };

  const removeGuardian = (index: number) => {
    const updated = [...baseGuardians];
    updated.splice(index, 1);
    handleChange("guardians", updated);
  };

  return (
    <>
      {/* Patient Fields */}

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          disabled={isView}
          value={getValue("name")}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled={isView}
          value={getValue("email")}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          disabled={isView}
          value={getValue("phoneNo")}
          onChange={(e) =>
            handleChange("phoneNo", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>DOB</Form.Label>
        <Form.Control
          type="date"
          disabled={isView}
          value={getValue("dob")}
          onChange={(e) =>
            handleChange("dob", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Admission Date</Form.Label>
        <Form.Control
          type="date"
          disabled={isView}
          value={getValue("admissionDate")}
          onChange={(e) =>
            handleChange("admissionDate", e.target.value)
          }
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Form.Select
          disabled={isView}
          value={getValue("gender")}
          onChange={(e) =>
            handleChange("gender", e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Form.Select>
      </Form.Group>

      {/* Guardian Section */}

      {isMinor && (
        <>
          <hr />
          <h5>Guardian Details</h5>

          {!isView && (
            <button type="button" onClick={addGuardian}>
              + Add Guardian
            </button>
          )}

          {baseGuardians.map((g: any, index: number) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginTop: 10,
                borderRadius: 6,
                position: "relative",
              }}
            >
              {!isView && (
                <button
                  type="button"
                  onClick={() => removeGuardian(index)}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "transparent",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              )}

              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  disabled={isView}
                  value={g.name || ""}
                  onChange={(e) =>
                    updateGuardian(index, "name", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  disabled={isView}
                  value={g.dob || ""}
                  onChange={(e) =>
                    updateGuardian(index, "dob", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  disabled={isView}
                  value={g.phoneNo || ""}
                  onChange={(e) =>
                    updateGuardian(index, "phoneNo", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled={isView}
                  value={g.email || ""}
                  onChange={(e) =>
                    updateGuardian(index, "email", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Government ID</Form.Label>
                <Form.Control
                  disabled={isView}
                  value={g.govtId || ""}
                  onChange={(e) =>
                    updateGuardian(index, "govtId", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Relation</Form.Label>
                <Form.Control
                  disabled={isView}
                  value={g.relation || ""}
                  onChange={(e) =>
                    updateGuardian(index, "relation", e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PatientForm;