import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface User{
     userid :string,
     email :string,
     password :string,
     phone :string,
     role :string,
     user_name :string,

  }
interface UserEditProps{
    show:boolean;
    selectedRow:User |null;
    handleClose :() => void;
    handleUpdate : (updatedUser: any) => void
}

function EditUser({show,selectedRow,handleClose,handleUpdate} : UserEditProps) {
  return (
   <>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  );
}

export default EditUser;