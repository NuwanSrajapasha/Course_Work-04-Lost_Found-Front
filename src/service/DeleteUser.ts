import axios from "axios";

const UpdateUserURL= "http://localhost:8080/lost_found/api/v1/users"

export const DeleteUser=async(userID : string)=>{
    //GetUsers
    try{
        const response=axios.delete(
             `${UpdateUserURL}/${userID}`,  // Changed to RESTful format
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add if using auth
                }
            }
         );
        
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error delete user:", err);  
    throw err;
    }

}