import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css"; 

interface Item {
  itemID: string;
  itemName: string;
  itemDescription: string;
  lostDate: string;
  lostTime: string;
  lostLocation: string;
  itemStatus: string;
}

function LostItem({ show, handleClose, handleAdd, addItem }: any) {
  const [newItem, setNewItem] = useState<Item>({
    itemID: "",
    itemName: "",
    itemDescription: "",
    lostDate: "",
    lostTime: "",
    lostLocation: "",
    itemStatus: "LOST",
  });

  const [selectedTime, setSelectedTime] = useState<Date | null>(null); 

  //handleOnChange for text inputs
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle DatePicker change
  const handleTimeChange = (date: Date | null) => {
    setSelectedTime(date);
    if (date) {
      // Convert to readable time (HH:mm)
      const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setNewItem((prev) => ({ ...prev, lostTime: formattedTime }));
    } else {
      setNewItem((prev) => ({ ...prev, lostTime: "" }));
    }
  };

  //HandleOnSubmit
  const handleOnSubmit = async () => {
    try {
      const newitemDetails = await addItem(newItem);
      handleAdd(newitemDetails);
      handleClose();
    } catch (err) {
      console.error("Fail to Add User", err);
    }
  };

  //Reusable floating input
  const renderFloatingTabel = (label: string, name: keyof Item, type = "text", readOnly = false) => (
    <FloatingLabel controlId={`floating-${name}`} label={label} className="mb-3">
      <Form.Control
        type={type}
        name={name}
        value={newItem[name]}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lost Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {renderFloatingTabel("Item Name", "itemName")}
          {renderFloatingTabel("Item Description", "itemDescription")}
          {renderFloatingTabel("Lost Date", "lostDate", "date")}
          
         
          <div className="mb-3">
            <label htmlFor="lostTimePicker" className="form-label">Lost Time</label>
            <DatePicker
              id="lostTimePicker"
              selected={selectedTime}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30} // 30-minute step
              timeCaption="Time"
              dateFormat="HH:mm"
              className="form-control"
              placeholderText="Select time"
            />
          </div>

          {renderFloatingTabel("Lost Location", "lostLocation")}
          {renderFloatingTabel("Lost Status", "itemStatus", "text", true)}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LostItem;
