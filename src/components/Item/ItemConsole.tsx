import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AddItemData,DeleteItem,GetItems,UpdateItems } from "../Services/ItemData";
import LostItem from "./LostItem";
import RequestItem from "./RequestItem";


export function ItemConsole(){
  
interface Item {
  itemID: string;
  itemName: string;
  itemDescription: string;
  lostDate: string;
  lostTime: string;
  lostLocation: string; 
  itemStatus : string;
 
   
}

const [itemData, setItemData] = useState<Item[]>([]);
const [selectedRow, setSelectedRow] = useState<Item | null>(null);
const [showEditItemForm, setShowEditItemForm] = useState(false);
const [showAddItemForm, setShowAddItemForm] = useState(false);

// Load data once
useEffect(() => {
    const loadData = async () => {
      const itemDetails = await GetItems();
      setItemData(itemDetails);
    };
    loadData();
  }, []);

const tHeads: string[] = ["ID", "Item Name", "Description", "Lost Date", "Lost Time", "Location", "Status","Actions"];


 //HandleEdit
  const handleEdit = (row: Item) => {
    console.log("Handle Edit:", row);
    setSelectedRow(row);        
    setShowEditItemForm(true); 
  };

  
//HandleClose
  const handleClose = () => setShowEditItemForm(false);

   //Handle Update
  const handleUpdate = (updatedItem: Item) => {
    console.log("Updated item:", updatedItem);
    const updatedItems=itemData.map((item)=>
    item.itemID ===updatedItem.itemID ? updatedItem : item);
    setItemData(updatedItems)
  };

//Handle  Delete
  const handleDelete= async (itemID:string )=>{
    if (window.confirm("Are you sure you want to delete this user?")) {
        try {
            await DeleteItem(itemID);
            setItemData(itemData.filter(item => item.itemID !== itemID));
            
        } catch (err) {
           console.log("fail to delete..",err);
        }
    }
  
  }
  
   //Handle addUser
  const handleAdd = (newItem: Item) => {
  setItemData((prevData) => [...prevData, newItem]);
};

 



return(
    <>
         <div className="d-flex justify-content-end p-3">
      <Button variant="primary" onClick={()=>setShowAddItemForm(true)}>LOST</Button>
    </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tHeads.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {itemData.map((row) => (
            <tr key={row.itemID}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className="d-flex gap-2">
                  <Button variant="success" onClick={() => handleEdit(row)}> Request </Button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RequestItem
        show={showEditItemForm}
        selectedRow={selectedRow}
        handleClose={handleClose}
        handleUpdate={handleUpdate} 
        updateItems={UpdateItems}
      />
      <LostItem
      show={showAddItemForm}
      handleClose={()=>setShowAddItemForm(false)}
      handleAddNew={handleAdd}
      AddItem={AddItemData}

      />
    </>
    );

}


