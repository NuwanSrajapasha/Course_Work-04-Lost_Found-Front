import Table from "react-bootstrap/esm/Table";
import { GetUsers } from "../service/GetUsers";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EditUser from "./Edituser";

export function UserConsole() {
 interface User {
  userID: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userRole: string;  // or enum if you have Role enum
}


  const [userData, setUserData] = useState<User[]>([]);
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const [showEditUserForm, setShowEditUserForm] = useState(false);

  // Load data once
  useEffect(() => {
    const loadData = async () => {
      const userDetails = await GetUsers();
      setUserData(userDetails);
    };
    loadData();
  }, []);

  const tHeads: string[] = ["ID", "User Name", "Email", "Password", "Phone", "Role", "Actions"];

  const handleEdit = (row: User) => {
    console.log("Handle Edit:", row);
    setSelectedRow(row);        
    setShowEditUserForm(true); 
  };

  const handleClose = () => setShowEditUserForm(false);

  const handleUpdate = (updatedUser: User) => {
    alert("Updated user");
    console.log("Updated user:", updatedUser);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tHeads.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((row) => (
            <tr key={row.userID}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className="d-flex gap-2">
                  <Button variant="success" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditUser
        show={showEditUserForm}
        selectedRow={selectedRow}
        handleClose={handleClose}
        handleUpdate={handleUpdate} // ✅ correct function signature
      />
    </>
  );
}

export default UserConsole;
