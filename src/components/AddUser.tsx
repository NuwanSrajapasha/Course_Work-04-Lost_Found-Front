import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import { AddUserData } from "../service/UserData";

interface User {
  userID: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userRole: string;  // or enum if you have Role enum
}

// interface UserEditProps {
//   show: boolean;
//   selectedRow: User | null;
//   handleClose: () => void;
//   handleUpdate: (updatedUser: User) => void;
// }

function AddUser({ show, handleClose, handleAdd,addUser }: any) {
  const [newUser, setNewUser] = useState<User>({
    userID: "",
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhone: "",
    userRole: "",
  });

  

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const {name,value}=e.target;
   setNewUser((prev)=>({...prev,[name] : value}))
  };

  const  handleOnSubmit= async () => {
    try {
      const newuserDetails = await addUser(newUser);
      handleAdd(newuserDetails);
      handleClose();
    } catch (err) {
      console.error("Fail to Add User", err);
    }
  };
    //handle the repeat FloatingLabel
const renderFloatingTabel=(label:string,name:keyof User,type="text",readOnly=false)=>
      (
      <FloatingLabel controlId="floatingUserID"label={label} className="mb-3">
        <Form.Control
        type={type}
        name={name}
        value={newUser[name]}
        onChange={handleOnChange}
        readOnly={readOnly}/>
      </FloatingLabel>
    );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          
          {renderFloatingTabel("User Name","userName","text",false)}
          {renderFloatingTabel("Email","userEmail","text",false)}
           {renderFloatingTabel("Password","userPassword","text",false)}
      
      
          <FloatingLabel
            controlId="floatingUserRole"
            label="Role"
            className="mb-3"
          >
            <Form.Select
              name="userRole"
              value={newUser.userRole}
              onChange={(e) => setNewUser({ ...newUser, userRole: e.target.value })}
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
        <Button variant="primary" onClick={handleOnSubmit}>
          Save 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUser;
