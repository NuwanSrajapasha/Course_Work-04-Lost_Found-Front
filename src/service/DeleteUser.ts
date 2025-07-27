import axios from "axios";

const updateURL= "http://localhost:8080/lost_found/api/v1/users"

export const DeleteUser=async(userID:string)=>{
    try{
        const response=await axios.delete(
            `${updateURL}?userID=${userID}`
        );
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error("Failed to delete data error",error);
        throw error 
    }
    
}