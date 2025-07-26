import Table from "react-bootstrap/esm/Table";
import { GetUsers } from "../service/GetUsers";
import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import EditUser from "./Edituser";




export function UserConsole(){

  interface User{
     userid :string,
     email :string,
     password :string,
     phone :string,
     role :string,
     user_name :string,

  }

  const [userData,setUserData]=useState<User[]>([])
  const [selectedRow,setSelectedRow]=useState<User | null>(null)
  const [showEditUserForm,setShowEditUserForm]= useState(false) //handle show the edituserForm

    //add use Effect to load data
    useEffect(()=>{
        const loadData=async()=>{
             const userDetails=await GetUsers()
              setUserData(userDetails);
        };
        loadData()
    },[])
    const tHeads: string[] =[
        "ID",
        "User Name",
        "Email",
        "Password",
        "Phone",
        "Role",
       ];

    //Hanlde Edit function
    const handleEdit=(row : User)=>{
      console.log("Henalde Edit",row);
      setSelectedRow(row)
      setShowEditUserForm(true)
    }

    const hanleClose=()=> setShowEditUserForm(false)
    const handleUpdate=()=>(updatedUser: User) =>{
      alert ("updated user")
      console.log("Update user",updatedUser)
    }
     
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              {tHeads.map((headings) => (
                <th>{headings}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {userData.map((row) => (
              <tr key={row.userid}>
                {Object.values(row).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="success" onClick={() => handleEdit(row)}>
                      Edit
                    </Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <EditUser
          show={showEditUserForm}
          selectedRow={selectedRow}
          handleClose={hanleClose}
          handleUpdate={handleUpdate}
        />
      </>
    );
}

export default UserConsole;