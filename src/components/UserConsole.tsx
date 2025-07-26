import Table from "react-bootstrap/esm/Table";
import { GetUsers } from "../service/GetUsers";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";



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
    return(
       <Table striped bordered hover>
      <thead>
        <tr>
            {tHeads.map((headings)=>
               <th>{headings}</th> )}
         
        </tr>
      </thead>
             
      <tbody>
         {userData.map((row)=>(
                <tr key={row.userid}>
                  {Object.values(row).map((cell,index)=>(
                    <td key={index}>
                      {cell}
                    </td>
                  ))}
                  <td>
                    <div className="d-flex gap-2">
                        <Button variant="success">Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </div>
                    
                  </td>
                 
                </tr>
              ))}
        
      </tbody>
    </Table>
  
    );
}
export default UserConsole;