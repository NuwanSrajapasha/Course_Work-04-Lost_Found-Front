import Table from "react-bootstrap/esm/Table";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddUser from "./AddUser";
import {AddUserData,DeleteUser,GetUsers,UpdateUsers} from '../service/UserData'
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
  const [showAddUserForm, setShowAddUserForm] = useState(false);

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
    console.log("Updated user:", updatedUser);
    const updatedUsers=userData.map((user)=>
    user.userID ==updatedUser.userID ? updatedUser : user);
    setUserData(updatedUsers)
  };
  //Handle  Delete
  const handleDelete= async (userID:string )=>{
    if (window.confirm("Are you sure you want to delete this user?")) {
        try {
            await DeleteUser(userID);
            setUserData(userData.filter(user => user.userID !== userID));
            setSuccess("User deleted successfully");
        } catch (err) {
            setError("Failed to delete user. You may not have permission.");
        }
    }
    try{
       DeleteUser("Deleted")
    setUserData(userData.filter((user) => user.userID !== userID))

    }catch(err){
      console.error("Delete book failed ",err)
    }
   
  }
  //Handle addUser
  const handleAdd = (newUser: User) => {
  setUserData((prevData) => [...prevData, newUser]);
};

  return (
    <>
    <div className="d-flex justify-content-end p-3">
      <Button variant="primary" onClick={()=>setShowAddUserForm(true)}>Add User</Button>
    </div>
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
                  <Button variant="danger" onClick={()=> handleDelete(row.userID)}>Delete</Button>
                  
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
        handleUpdate={handleUpdate} 
      />
      <AddUser
      show={showAddUserForm}
      handleClose={()=>setShowAddUserForm(false)}
      handleAddNew={handleAdd}

      />
    </>
  );
}

export default UserConsole;
function setSuccess(arg0: string) {
  throw new Error("Function not implemented.");
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

