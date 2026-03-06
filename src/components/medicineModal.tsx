import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

export interface MedicineValues {
    name: string;
    dosage: string;
    noOfStrips: number;
    tabletsPerStrip: number;
    pricePerStrip: number;
    expiryDate: string;
}

interface Props {
    show: boolean;
    mode: "create" | "edit" | "view";
    onClose: () => void;
    onSubmit: (data: MedicineValues) => Promise<void>;
    initialData?: MedicineValues;
    loading?: boolean;
}

const MedicineModal: React.FC<Props> = ({
    show,
    mode,
    onClose,
    onSubmit,
    initialData,
    loading,
}) => {
    const isView = mode === "view";

    const initialValues: MedicineValues = {
        name: initialData?.name ?? "",
        dosage: initialData?.dosage ?? "",
        noOfStrips: initialData?.noOfStrips ?? 0,
        tabletsPerStrip: initialData?.tabletsPerStrip ?? 0,
        pricePerStrip: initialData?.pricePerStrip ?? 0,
        expiryDate: initialData?.expiryDate ?? "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Medicine name required"),
        dosage: Yup.string().required("Dosage required"),

        noOfStrips: Yup.number()
            .required("No of strips required")
            .min(1, "Must be greater than 0"),

        tabletsPerStrip: Yup.number()
            .required("Tablets per strip required")
            .min(1, "Must be greater than 0"),

        pricePerStrip: Yup.number()
            .required("Price required")
            .min(1, "Must be greater than 0"),

        expiryDate: Yup.date().required("Expiry date required"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, handleChange, values }) => (
                <Modal show={show} onHide={onClose} centered backdrop="static">
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {mode === "create"
                                    ? "Create Medicine"
                                    : mode === "edit"
                                        ? "Edit Medicine"
                                        : "View Medicine"}
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Card>
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Medicine Name</Form.Label>
                                            <Form.Control
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                disabled={isView}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Dosage</Form.Label>
                                            <Form.Control
                                                name="dosage"
                                                value={values.dosage}
                                                onChange={handleChange}
                                                disabled={isView}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>No Of Strips</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="noOfStrips"
                                                value={values.noOfStrips}
                                                onChange={handleChange}
                                                min={1}
                                                disabled={isView}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Label>Tablets Per Strip</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="tabletsPerStrip"
                                                value={values.tabletsPerStrip}
                                                onChange={handleChange}
                                                min={1}
                                                disabled={isView}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Price Per Strip</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="pricePerStrip"
                                                value={values.pricePerStrip}
                                                onChange={handleChange}
                                                min={1}
                                                disabled={isView}
                                            />
                                        </Col>

                                        <Col>
                                            <Form.Label>Expiry Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="expiryDate"
                                                value={values.expiryDate}
                                                onChange={handleChange}
                                                disabled={isView}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onClose}>
                                Close
                            </Button>

                            {!isView && (
                                <Button type="submit" disabled={loading}>
                                    {loading
                                        ? mode === "create"
                                            ? "Creating..."
                                            : "Updating..."
                                        : mode === "create"
                                            ? "Create"
                                            : "Update"}
                                </Button>
                            )}
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}
        </Formik>
    );
};

export default MedicineModal;