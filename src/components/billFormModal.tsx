import { useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";

interface BillValues {
  patientId: string;
}

interface Props {
  show: boolean;
  mode: "create" | "view";
  onClose: () => void;
  onSubmit: (data: BillValues) => void;
  initialData?: any;
  loading?: boolean;
}

const BillFormModal: React.FC<Props> = ({
  show,
  mode,
  onClose,
  onSubmit,
  initialData,
  loading,
}) => {

  const isViewMode = mode === "view";

  const initialValues: BillValues = useMemo(() => ({
    patientId: initialData?.patientId || "",
  }), [initialData]);

  const validationSchema = Yup.object({
    patientId: Yup.string().required("Patient ID is required"),
  });

const handleGeneratePdf = async () => {
  try {
    const res = await fetch(
      `http://localhost:8080/bill/generate/${initialData.patientId}`
    );

    const pdfList = await res.json();

    if (pdfList && pdfList.length > 0) {
      const pdfUrl = `http://localhost:8080/uploads/${pdfList[0]}`;
      window.open(pdfUrl, "_blank");
    }
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
};
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "create" ? "CREATE BILL" : "VIEW BILL"}
        </Modal.Title>
      </Modal.Header>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>

              <Form.Group className="mb-3">
                <Form.Label>Patient ID</Form.Label>
                <Form.Control
                  name="patientId"
                  value={values.patientId}
                  onChange={handleChange}
                  disabled={isViewMode}
                  isInvalid={!!errors.patientId && touched.patientId}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.patientId}
                </Form.Control.Feedback>
              </Form.Group>

              {isViewMode && (
                <>
                  <p><strong>Bill Code:</strong> {initialData?.code}</p>
                  <p><strong>Amount:</strong> {initialData?.amount}</p>
                  <p><strong>Status:</strong> {initialData?.status}</p>
                  <p><strong>Created At:</strong> {initialData?.createdAt}</p>
                  <button type="button" onClick={handleGeneratePdf}>Generate pdf</button>
                </>
              )}

            </Modal.Body>

            {!isViewMode && (
              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>

                <Button type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "Create"}
                </Button>
              </Modal.Footer>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BillFormModal;