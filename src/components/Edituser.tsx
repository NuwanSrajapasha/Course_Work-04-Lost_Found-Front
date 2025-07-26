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
    show:Boolean;
    selectedRow:User |null;
    handleClose :() => void;
    handleUpdate : (updatedUser: any) => void
}

function EditUser({show,selectedRow,handleClose,handleUpdate} : UserEditProps) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default EditUser;