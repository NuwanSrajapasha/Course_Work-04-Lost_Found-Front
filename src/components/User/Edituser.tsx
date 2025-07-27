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
  userRole: string;  
}

interface UserEditProps {
  show: boolean;
  selectedRow: User | null;
  handleClose: () => void;
  handleUpdate: (updatedUser: User) => void;
  updateUsers : (user : User ) => Promise<void>;
}

function EditUser({ show, selectedRow, handleClose, handleUpdate,updateUsers }: UserEditProps) {
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
      await updateUsers(user);
      handleUpdate(user);
      handleClose();
    } catch (err) {
      console.error("Fail to update User", err);
    }
  };

  //handle the repeat FloatingLabel
const renderFloatingTabel=(label:string,name:keyof User,type="text",readOnly=false)=>
    (
    <FloatingLabel controlId="floatingUserID"label="User Name"className="mb-3">
      <Form.Control
      type={type}
      name={name}
      value={user[name]}
      onChange={handleOnChange}
      readOnly={readOnly}/>
    </FloatingLabel>
  );


return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {renderFloatingTabel("user ID","userID","text",true)}
          {renderFloatingTabel("User Name","userName","text",false)}
          {renderFloatingTabel("Email","userEmail","text",false)}
      
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
