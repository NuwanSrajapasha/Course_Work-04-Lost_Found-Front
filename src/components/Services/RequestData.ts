import axios from "axios";

const BaseRequestURL= "http://localhost:8080/lost_found/api/v1/requests"

const AddRequestData=async(request : any)=>{
    //Save a request
    console.log("Save request.........",request)
    try{
        const response=await axios.post(
         `${BaseRequestURL}/addRequest`,
          request
        

        )
        console.log( response.data)
        return response.data;
    }catch(err){
    console.error("Error fetching requests:", err);  
    throw err;
    }

}


const DeleteRequest=async(requestID:string)=>{
    try{
        const response=await axios.delete(
            `${BaseRequestURL}?requestID=${requestID}`
        );
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error("Failed to delete data error",error);
        throw error 
    }
    
}



const GetRequests=async()=>{
    //GetRequests
    try{
        const response=axios.get(`${BaseRequestURL}/getAllreq`)
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching requests:", err);  
    throw err;
    }

}


 const UpdateRequests=async(request : any)=>{
    //GetRequests
      console.log("Updated request:", request);

  
  if (!request.requestID) {
    console.error("Missing requestID for update");
    return;
  }
    try{
        const response=axios.patch(
         `${BaseRequestURL}?requestID=${request.requestID}`,request
    
        );
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching requests:", err);  
    throw err;
    }

}

export {AddRequestData,DeleteRequest,GetRequests,UpdateRequests}







