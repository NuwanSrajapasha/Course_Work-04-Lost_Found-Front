import axios from "axios";

const AddUserURL= "http://localhost:8080/lost_found/api/v1/users"

export const AddUserData=async(user : any)=>{
    //Save a user
    console.log("Save user.........",user)
    try{
        const response=await axios.post(
         AddUserURL
         ,user
        

        )
        console.log( response.data)
        return response.data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}