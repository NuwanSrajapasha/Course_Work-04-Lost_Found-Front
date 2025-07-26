import axios from "axios";

const AddUserURL= "http://localhost:8080/lost_found/api/v1/auths/register"

export const AddUserData=async(user : any)=>{
    //GetUsers
    try{
        const response=axios.post(
         AddUserURL
         ,user
        

        )
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}