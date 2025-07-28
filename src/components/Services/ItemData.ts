import axios from "axios";

const BaseUserURL= "http://localhost:8080/lost_found/api/v1/items"


const AddItemData=async(item : any)=>{
    //Save a item
    console.log("Save item.........",item)
    try{
        const response=await axios.post(
         `${BaseUserURL}/lost`,
         item
        

        )
        console.log( response.data)
        return response.data;
    }catch(err){
    console.error("Error fetching Items:", err);  
    throw err;
    }

}
const DeleteItem=async(itemID:string)=>{
    try{
        const response=await axios.delete(
            `${BaseUserURL}?itemID=${itemID}`
        );
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error("Failed to delete data error",error);
        throw error 
    }
    
}



const GetItems=async()=>{
    //GetUsers
    try{
        const response=axios.get(`${BaseUserURL}/lostAll`)
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching items:", err);  
    throw err;
    }

}


const UpdateItems=async(item : any)=>{
    //GetUsers
      console.log("Updated item:", item);

  if (!item.itemID) {
    console.error("Missing itemID for update");
    return;
  }
    try{
        const response=axios.patch(
         `${BaseUserURL}?userID=${item.itemID}`,item
    
        );
        console.log((await response).data)
        return (await response).data;
    }catch(err){
    console.error("Error fetching items:", err);  
    throw err;
    }

}

export {AddItemData,DeleteItem,GetItems,UpdateItems}
