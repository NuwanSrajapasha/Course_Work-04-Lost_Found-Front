import { Name } from "ajv";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
 
interface Item {
  itemID: string;
  itemName: string;
  itemDescription: string;
  lostDate: string;
  lostTime: string;
  lostLocation: string; 
  itemStatus : string;
   
}

interface ItemEditProps {
  show: boolean;
  selectedRow: Item | null;
  handleClose: () => void;
  handleUpdate: (updatedItem: Item) => void;
  updateItems : (item : Item ) => Promise<void>;
}

function RequestItem({ show, selectedRow, handleClose, handleUpdate,updateItems }: ItemEditProps) {
  const [item, setItem] = useState<Item>({
    itemID: "",
    itemName: "",
    itemDescription: "",
    lostDate: "",
    lostTime: "",
    lostLocation: "",
    itemStatus : ""
   
  });

  useEffect(() => {
  console.log("selectedRow changed:", selectedRow);
  if (selectedRow) {
    setItem({
      itemID: selectedRow.itemID || "",
      itemName: selectedRow.itemName || "",
      itemDescription: selectedRow.itemDescription || "",
      lostDate: selectedRow.lostDate || "",
      lostTime: selectedRow.lostTime || "",
      lostLocation: selectedRow.lostLocation || "",
      itemStatus: selectedRow.itemStatus || "",
      
    });
  }
}, [selectedRow]);


const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const {name,value}=e.target;
   setItem((prev)=>({...prev,[name] : value}))
  };

  const handleOnSave = async () => {
    try {
      handleUpdate(item);
      updateItem(item);
      handleUpdate(item);
      handleClose();
    } catch (err) {
      console.error("Fail to update Item", err);
    }
  };

  //handle the repeat FloatingLabel
const renderFloatingTabel=(label:string,name:keyof Item,type="text",readOnly=false)=>
    (
    <FloatingLabel controlId="floatingUserID"label={label} className="mb-3">
      <Form.Control
      type={type}
      name={name}
      value={item[name]}
      onChange={handleOnChange}
      readOnly={readOnly}/>
    </FloatingLabel>
  );


return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
         {renderFloatingTabel("Item ID","itemID","text",true)}
        {renderFloatingTabel("Request Description","itemDescription","text",false)}
      
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSave}>
         Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestItem;
function updateItem(item: Item) {
  throw new Error("Function not implemented.");
}

