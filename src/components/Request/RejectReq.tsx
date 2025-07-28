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

function RejectReq({ show, handleClose, handleAdd,addRequest }: any) {
  const [newRequest, setNewRequest] = useState<Request>({
  requestID: "",
  requestStatus: "",
  requestDescription: "",
  requestDate: "",
  requestTime: "",
  LinkeditemID: ""
  });

  

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const {name,value}=e.target;
   setNewRequest((prev)=>({...prev,[name] : value}))
  };

  const  handleOnSubmit= async () => {
    try {
      const newrequestDetails = await addRequest(newRequest);
      handleAdd(newrequestDetails);
      handleClose();
    } catch (err) {
      console.error("Fail to Add Request", err);
    }
  };
    //handle the repeat FloatingLabel
const renderFloatingTabel=(label:string,name:keyof Request,type="text",readOnly=false)=>
      (
      <FloatingLabel controlId="floatingRequestID"label={label} className="mb-3">
        <Form.Control
        type={type}
        name={name}
        value={newRequest[name]}
        onChange={handleOnChange}
        readOnly={readOnly}/>
      </FloatingLabel>
    );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          
          {renderFloatingTabel("Request Name","requestStatus","text",false)}
          {renderFloatingTabel("Description","requestDescription","text",false)}
      
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Save 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectReq;
