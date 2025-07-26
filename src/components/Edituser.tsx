import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface User {
  userID: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userRole: string;  // or enum if you have Role enum
}

interface UserEditProps {
  show: boolean;
  selectedRow: User | null;
  handleClose: () => void;
  handleUpdate: (updatedUser: User) => void;
}

function EditUser({ show, selectedRow, handleClose, handleUpdate }: UserEditProps) {
  const [user, setUser] = useState<User>({
    userID: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userRole: "",
  });

  useEffect(() => {
  console.log("selectedRow changed:", selectedRow);
  if (selectedRow) {
    setUser({
      userID: selectedRow.userID || "",
      userName: selectedRow.userName || "",
      userEmail: selectedRow.userEmail || "",
      userPassword: selectedRow.userPassword || "",
      userPhone: selectedRow.userPhone || "",
      userRole: selectedRow.userRole || "",
    });
  }
}, [selectedRow]);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnSave = () => {
    handleUpdate(user);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel controlId="floatingUserID" label="User ID" className="mb-3">
            <Form.Control
              readOnly
              type="text"
              name="userid"
              value={user.userID}
              onChange={handleOnChange}
             
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingUserID" label="User Name" className="mb-3">
            <Form.Control
              type="text"
              name="user_name"
              value={user.userName}
              onChange={handleOnChange}
             
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingUserID" label="Email" className="mb-3">
            <Form.Control
              type="text"
              name="Email"
              value={user.userEmail}
              onChange={handleOnChange}
             
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingUserID" label="Password" className="mb-3">
            <Form.Control
            readOnly
              type="text"
              name="password"
              value={user.userPassword}
              onChange={handleOnChange}
             
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingUserID" label="User ID" className="mb-3">
            <Form.Control
              type="text"
              name="userid"
              value={user.userRole}
              onChange={handleOnChange}
             
            />
          </FloatingLabel>
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

export default EditUser;
