import axios from "axios";

export const UpdateUserURL= "http://localhost:8080/lost_found/api/v1/users"

export const UpdateUsers=async(user : any)=>{
    //GetUsers
      console.log("Updated user:", user);

  // Ensure userID is present
  if (!user.userID) {
    console.error("Missing userID for update");
    return;
  }
    try{
        const response=axios.patch(
         `${UpdateUserURL}?userID=${user.userID}`,user
    
        );
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}


