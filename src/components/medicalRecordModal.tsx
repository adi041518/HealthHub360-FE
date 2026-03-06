import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { fetchAllTests } from "../axios/tests";
import PrescriptionModal from "./prescriptionModal";
 
/* ================= TYPES ================= */
 
interface TestItem {
  code: string;
}
 
interface TestReportItem {
  testId: string;
  reportFile: File | null;
}
 
interface Vitals {
  bp: string;
  pulseRate: string;
  height: string;
  weight: string;
  temperature: string;
}
 
export interface MedicalRecordValues {
  code: string;
  patientId: string;
  doctorId: string;
  reason: string;
  tests: TestItem[];
  vitals: Vitals;
  testReports: TestReportItem[];
  prescriptionId?: string;
}
 
interface Props {
  show: boolean;
  mode: "create" | "edit" | "view";
  onClose: () => void;
  onSubmit: (data: MedicalRecordValues) => Promise<void>;
  initialData?: MedicalRecordValues;
  loading?: boolean;
  module?: string; // DOCTOR | NURSE
}
 
/* ================= COMPONENT ================= */
 
const MedicalRecordModal: React.FC<Props> = ({
  show,
  mode,
  onClose,
  onSubmit,
  initialData,
  loading,
  module,
}) => {
  const isView = mode === "view";
 
  const disableVitals = isView || module !== "NURSE";
  const disableTests = isView || module !== "DOCTOR";
  const disableReports = isView || module !== "NURSE";
  const disablePrescription = isView || module !== "DOCTOR";
 
  const [testOptions, setTestOptions] = useState<any[]>([]);
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [showPrescription, setShowPrescription] = useState(false);
 
  /* ================= FETCH TEST MASTER ================= */
 
  useEffect(() => {
    fetchAllTests().then((res) =>
      setTestOptions(res?.data?.data || [])
    );
  }, []);
 
  /* ================= INITIAL VALUES ================= */
 
  const initialValues: MedicalRecordValues = {
    code: initialData?.code ?? "",
    patientId: initialData?.patientId ?? "",
    doctorId: initialData?.doctorId ?? "",
    reason: initialData?.reason ?? "",
    tests: initialData?.tests ?? [],
    testReports: initialData?.testReports ?? [],
    prescriptionId: initialData?.prescriptionId ?? "",
    vitals: initialData?.vitals ?? {
      bp: "",
      pulseRate: "",
      height: "",
      weight: "",
      temperature: "",
    },
  };
 
  const validationSchema = Yup.object({
    reason: Yup.string().required("Reason is required"),
  });
 
  /* ================= RENDER ================= */
 
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, setFieldValue }) => (
        <>
          <Modal show={show} onHide={onClose} size="xl" centered backdrop="static">
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Medical Record - {values.code || "New"}
                </Modal.Title>
              </Modal.Header>
 
              <Modal.Body>
 
                {/* ================= CHIEF COMPLAINT ================= */}
                <Card className="mb-4">
                  <Card.Header>Chief Complaint</Card.Header>
                  <Card.Body>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      disabled={isView}
                    />
                  </Card.Body>
                </Card>
 
                {/* ================= VITALS ================= */}
                <Card className="mb-4">
                  <Card.Header>Vitals</Card.Header>
                  <Card.Body>
                    <Row>
                      {["bp", "pulseRate", "temperature", "weight", "height"].map(
                        (field) => (
                          <Col md={3} key={field}>
                            <Form.Label>{field.toUpperCase()}</Form.Label>
                            <Form.Control
                              name={`vitals.${field}`}
                              value={values.vitals[field as keyof Vitals]}
                              onChange={handleChange}
                              disabled={disableVitals}
                            />
                          </Col>
                        )
                      )}
                    </Row>
                  </Card.Body>
                </Card>
 
                {/* ================= LAB TESTS ================= */}
                <Card className="mb-4">
                  <Card.Header>Lab Tests</Card.Header>
                  <Card.Body>
                    <FieldArray name="tests">
                      {({ push, remove }) => (
                        <>
                          {!disableTests && (
                            <Button
                              size="sm"
                              className="mb-3"
                              onClick={() => push({ code: "" })}
                            >
                              + Add Test
                            </Button>
                          )}
 
                          {values.tests.map((test, index) => (
                            <Row key={index} className="mb-2">
                              <Col md={10}>
                                <Form.Select
                                  name={`tests.${index}.code`}
                                  value={test.code}
                                  onChange={handleChange}
                                  disabled={disableTests}
                                >
                                  <option value="">Select Test</option>
                                  {testOptions.map((t) => (
                                    <option key={t.code} value={t.code}>
                                      {t.testname}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
 
                              {!disableTests && (
                                <Col md={2}>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              )}
                            </Row>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Card.Body>
                </Card>
 
                {/* ================= TEST REPORTS ================= */}
                <Card className="mb-4">
                  <Card.Header>Test Reports</Card.Header>
                  <Card.Body>
                    <FieldArray name="testReports">
                      {({ push, remove }) => (
                        <>
                          {!disableReports && (
                            <Button
                              size="sm"
                              className="mb-3"
                              onClick={() =>
                                push({ testId: "", reportFile: null })
                              }
                            >
                              + Add Report
                            </Button>
                          )}
 
                          {values.testReports.map((report, index) => (
                            <Row key={index} className="mb-2">
                              <Col md={5}>
                                <Form.Select
                                  name={`testReports.${index}.testId`}
                                  value={report.testId}
                                  onChange={handleChange}
                                  disabled={disableReports}
                                >
                                  <option value="">Select Test</option>
                                  {values.tests.map((t) => (
                                    <option key={t.code} value={t.code}>
                                      {t.code}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
 
                              <Col md={5}>
                                <Form.Control
                                  type="file"
                                  disabled={disableReports}
                                  onChange={(e: any) =>
                                    setFieldValue(
                                      `testReports.${index}.reportFile`,
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </Col>
 
                              {!disableReports && (
                                <Col md={2}>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              )}
                            </Row>
                          ))}
                        </>
                      )}
                    </FieldArray>
                  </Card.Body>
                </Card>
 
                {/* ================= PRESCRIPTION ================= */}
                <Card className="mb-4">
                  <Card.Header>Prescription</Card.Header>
                  <Card.Body>
                    {prescriptionData ? (
                      <>
                        <p><strong>Diagnosis:</strong> {prescriptionData.diagnosis}</p>
 
                        {!disablePrescription && (
                          <Button
                            onClick={() => setShowPrescription(true)}
                          >
                            Edit Prescription
                          </Button>
                        )}
                      </>
                    ) : (
                      !disablePrescription && (
                        <Button
                          onClick={() => setShowPrescription(true)}
                        >
                          Create Prescription
                        </Button>
                      )
                    )}
                  </Card.Body>
                </Card>
 
              </Modal.Body>
 
              <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
 
                {!isView && (
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Record"}
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
 
          {/* ================= PRESCRIPTION MODAL ================= */}
          <PrescriptionModal
            show={showPrescription}
            mode={prescriptionData ? "edit" : "create"}
            initialData={prescriptionData}
            onClose={() => setShowPrescription(false)}
            onSubmit={async (data: any) => {
              setPrescriptionData(data);
              setShowPrescription(false);
            }}
          />
        </>
      )}
    </Formik>
  );
};
 
export default MedicalRecordModal;
 