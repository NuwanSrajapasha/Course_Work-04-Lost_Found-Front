import axios from 'axios'
const getUserURL= "http://localhost:8080/lost_found/api/v1/users/getAllUser"

export const GetUsers=async()=>{
    //GetUsers
    try{
        const response=axios.get(getUserURL)
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}