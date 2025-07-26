import axios from "axios";

const BaseUserURL= "http://localhost:8080/lost_found/api/v1/users"

const AddUserData=async(user : any)=>{
    //GetUsers
    try{
        const response=axios.post(
         BaseUserURL
         ,user
        

        )
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}


const DeleteUser=async(userID : string)=>{
    //GetUsers
    try{
        const response=axios.delete(
             `${BaseUserURL}/${userID}`,  // Changed to RESTful format
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




 const GetUsers=async()=>{
    //GetUsers
    try{
        const response=axios.get(BaseUserURL)
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}



const UpdateUserURL= "http://localhost:8080/lost_found/api/v1/users"

const UpdateUsers=async(user : any)=>{
    //GetUsers
    try{
        const response=axios.patch(
         `${UpdateUserURL}?userID=${user.userID}`,user
        

        )
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching users:", err);  
    throw err;
    }

}
export{AddUserData,DeleteUser,GetUsers,UpdateUsers}