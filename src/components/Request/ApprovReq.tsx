import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
 
interface Request {
  requestID: string;
  requestStatus: string;
  requestDescription: string;
  requestDate: string;
  requestTime: string;
  LinkeditemID: string;  
}

interface RequestEditProps {
  show: boolean;
  selectedRow: Request | null;
  handleClose: () => void;
  handleUpdate: (updatedRequest: Request) => void;
  updateRequests : (request : Request ) => Promise<void>;
}

function ApproveReq({
  show,
  selectedRow,
  handleClose,
  handleUpdate,
  updateRequests,
}: RequestEditProps) {
  const [request, setRequest] = useState<Request>({
    requestID: "",
    requestStatus: "",
    requestDescription: "",
    requestDate: "",
    requestTime: "",
    LinkeditemID: "",
  });

  useEffect(() => {
    console.log("selectedRow changed:", selectedRow);
    if (selectedRow) {
      setRequest({
        requestID: selectedRow.requestID || "",
        requestStatus: selectedRow.requestStatus || "",
        requestDescription: selectedRow.requestDescription || "",
        requestDate: selectedRow.requestDate || "",
        requestTime: selectedRow.requestTime || "",
        LinkeditemID: selectedRow.LinkeditemID || "",



      });
    }
  }, [selectedRow]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSave = async () => {
    try {
      handleUpdate(request);
      await updateRequests(request);
      handleUpdate(request);
      handleClose();
    } catch (err) {
      console.error("Fail to update Request", err);
    }
  };

  //handle the repeat FloatingLabel
  const renderFloatingTabel = (
    label: string,
    name: keyof Request,
    type = "text",
    readOnly = false
  ) => (
    <FloatingLabel controlId="floatingRequestID" label={label} className="mb-3">
      <Form.Control
        type={type}
        name={name}
        value={request[name]}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {renderFloatingTabel("request ID", "requestID", "text", true)}
          {renderFloatingTabel("Request Status", "requestStatus", "text", false)}
          {renderFloatingTabel("Request Description", "requestDescription", "text", false)}
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApproveReq;


