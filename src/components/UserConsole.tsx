import Table from "react-bootstrap/esm/Table";



export function UserConsole(){
    const tHeads: string[] =[
        "ID",
        "User userName",
        "Email",
        "Password",
        "Phone",
        "role",
       



    
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  
    );
}
export default UserConsole;