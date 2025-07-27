import axios from "axios";

const BaseUserURL= "http://localhost:8080/lost_found/api/v1/users"
//const updateURL= "http://localhost:8080/lost_found/api/v1/users"
//const getUserURL= "http://localhost:8080/lost_found/api/v1/users/getAllUser"
//const UpdateUserURL= "http://localhost:8080/lost_found/api/v1/users"

const AddUserData=async(user : any)=>{
    //Save a user
    console.log("Save user.........",user)
    try{
        const response=await axios.post(
         BaseUserURL
         ,user
        

        )
        console.log( response.data)
        return response.data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}


const DeleteUser=async(userID:string)=>{
    try{
        const response=await axios.delete(
            `${BaseUserURL}?userID=${userID}`
        );
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error("Failed to delete data error",error);
        throw error 
    }
    
}



const GetUsers=async()=>{
    //GetUsers
    try{
        const response=axios.get(`${BaseUserURL}/getAllUser`)
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}


 const UpdateUsers=async(user : any)=>{
    //GetUsers
      console.log("Updated user:", user);

  // Ensure userID is present
  if (!user.userID) {
    console.error("Missing userID for update");
    return;
  }
    try{
        const response=axios.patch(
         `${BaseUserURL}?userID=${user.userID}`,user
    
        );
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}

export {AddUserData,DeleteUser,GetUsers,UpdateUsers}







