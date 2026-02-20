import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
 
interface Props {
  show: boolean;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}
 
const TenantFormModal: React.FC<Props> = ({
  show,
  mode,
  onClose,
  onSubmit,
  initialData,
}) => {
 
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
 
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
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
      });
    }
  }, [initialData, show]);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewMode) return; // 🔥 block editing in view mode
 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = () => {
    if (isViewMode) return;
    onSubmit(formData);
    onClose();
  };
 
  const getTitle = () => {
    if (mode === "create") return "Create Tenant";
    if (mode === "edit") return "Edit Tenant";
    return "View Tenant";
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
            <Form.Label>Tenant Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              disabled={isViewMode || isEditMode}
            />
          </Form.Group>
 
          <Form.Group className="mb-3">
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control
              type="text"
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
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </Form.Group>
 
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={isViewMode}
            />
          </Form.Group>
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
 
export default TenantFormModal;