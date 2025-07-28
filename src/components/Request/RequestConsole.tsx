import Table from "react-bootstrap/esm/Table";

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {AddRequestData,GetRequests,DeleteRequest,UpdateRequests} from "../Services/RequestData"
import EditRequest from "./ApprovReq";
import AddRequest from "./RejectReq";


export function RequestConsole() {
 interface Request {
  requestID: string;
  requestStatus: string;
  requestDescription: string;
  requestDate: string;
  requestTime: string;
  LinkeditemID: string;  
}


  const [requestData, setRequestData] = useState<Request[]>([]);
  const [selectedRow, setSelectedRow] = useState<Request | null>(null);
  const [showEditRequestForm, setShowEditRequestForm] = useState(false);
  const [showAddRequestForm, setShowAddRequestForm] = useState(false);

  // Load data once
  useEffect(() => {
    const loadData = async () => {
      const RequestDetails = await GetRequests();
      setRequestData(RequestDetails);
    };
    loadData();
  }, []);

  const tHeads: string[] = ["ID", "RequestID", "Description", "Date", "Time", "Status", "LinkedID"];

  //HandleEdit
  const handleEdit = (row: Request) => {
    console.log("Handle Edit:", row);
    setSelectedRow(row);        
    setShowEditRequestForm(true); 
  };

  //HandleClose
  const handleClose = () => setShowEditRequestForm(false);

  //Handle Update
  const handleUpdate = (updatedRequest: Request) => {
    console.log("Updated Request:", updatedRequest);
    const updatedRequests=requestData.map((Request)=>
    Request.requestID ===updatedRequest.requestID ? updatedRequest : Request);
    setRequestData(updatedRequests)
  };
  //Handle  Delete
  const handleDelete= async (RequestID:string )=>{
    if (window.confirm("Are you sure you want to delete this Request?")) {
        try {
            await DeleteRequest(RequestID);
            setRequestData(requestData.filter(Request => Request.requestID !== RequestID));
            setSuccess("Request deleted successfully");
        } catch (err) {
            setError("Failed to delete Request. You may not have permission.");
        }
    }
    try{
       DeleteRequest("Deleted")
    setRequestData(requestData.filter((Request) => Request.requestID !== RequestID))

    }catch(err){
      console.error("Delete book failed ",err)
    }
   
  }
  //Handle addRequest
  const handleAdd = (newRequest: Request) => {
  setRequestData((prevData) => [...prevData, newRequest]);
};

  return (
    <>
    <div className="d-flex justify-content-end p-3">
      <Button variant="primary" onClick={()=>setShowAddRequestForm(true)}>Add Request</Button>
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
          {requestData.map((row) => (
            <tr key={row.requestID}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className="d-flex gap-2">
                  <Button variant="success" onClick={() => handleEdit(row)}>
                    Approve
                  </Button>
                  <Button variant="danger" onClick={()=> handleDelete(row.requestID)}>Reject</Button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditRequest
        show={showEditRequestForm}
        selectedRow={selectedRow}
        handleClose={handleClose}
        handleUpdate={handleUpdate} 
        updateRequests={UpdateRequests}
      />
      <AddRequest
      show={showAddRequestForm}
      handleClose={()=>setShowAddRequestForm(false)}
      handleAddNew={handleAdd}
      addRequest={AddRequestData}

      />
    </>
  );
}

export default RequestConsole;
function setSuccess(arg0: string) {
  throw new Error("Function not implemented.");
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
