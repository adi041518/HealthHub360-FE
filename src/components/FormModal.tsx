import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface Props {
  show: boolean;
  module: string;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const ModuleFormModal: React.FC<Props> = ({
  show,
  module,
  mode,
  onClose,
  onSubmit,
  initialData,
}) => {

  const isViewMode = mode === "view";

  const [formData, setFormData] = useState<any>({
    code: "",
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    address: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        code: "",
        name: "",
        email: "",
        phoneNo: "",
        dob: "",
        address: ""
      });
    }
  }, [initialData, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewMode) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isViewMode) return;

    onSubmit(formData);
    onClose();
  };

  const getTitle = () => {
    const action =
      mode === "create"
        ? "Create"
        : mode === "edit"
          ? "Edit"
          : "View";

    return `${action} ${module.toUpperCase()}`;
  };

  const getButtonText = () => {
    if (mode === "create") return "Create";
    if (mode === "edit") return "Update";
    return "";
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Code</Form.Label>
            <Form.Control
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={isViewMode || mode === "edit"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </Form.Group>

          {module !== "doctor" && (
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isViewMode}
              />
            </Form.Group>
          )}

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        {!isViewMode && (
          <Button variant="success" onClick={handleSubmit}>
            {getButtonText()}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModuleFormModal;
