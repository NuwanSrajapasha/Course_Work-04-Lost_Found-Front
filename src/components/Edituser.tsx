import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UpdateUsers } from "../service/User/UpdateUser";

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
   const {name,value}=e.target;
   setUser((prev)=>({...prev,[name] : value}))
  };

  const handleOnSave = async () => {
    try {
      handleUpdate(user);
      const updateUser = await UpdateUsers(user);
      handleUpdate(updateUser);
      handleClose();
    } catch (err) {
      console.error("Fail to update User", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingUserID"
            label="User ID"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name=" userID"
              value={user.userID}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserID"
            label="User Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserID"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="userEmail"
              value={user.userEmail}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserID"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              readOnly
              type="text"
              name="userPassword"
              value={user.userPassword}
              onChange={handleOnChange}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingUserRole"
            label="Role"
            className="mb-3"
          >
            <Form.Select
              name="userRole"
              value={user.userRole}
              onChange={(e) => setUser({ ...user, userRole: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="ADMIN">USER</option>
              <option value="USER">STAFF</option>
                <option value="USER">ADMIN</option>
            </Form.Select>
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
