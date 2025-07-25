import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Register() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",  // center vertically
        alignItems: "center",      //  center horizontally
        flexDirection: "column",   // stack heading + form vertically
        minHeight: "80vh"          // give some height
      }}
    >
      {/*  BIG MAIN HEADING CENTERED */}
      <h1 style={{ marginBottom: "50px" }}>Welcome to Lost Found Hub</h1>

      {/*  SUB HEADING CENTERED */}
      <h3 style={{ marginBottom: "30px" }}>Register</h3>

      {/* FORM CONTAINER ALSO CENTERED */}
      <div style={{ maxWidth: "320px", width: "100%" }}>
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" />

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        {/*PHONE NUMBER FIELD */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter 10-digit number"
            maxLength={10}
            pattern="[0-9]{10}"
          />
          <Form.Text muted>
            Enter a valid 10-digit phone number.
          </Form.Text>
        </Form.Group>

        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
          className="text-start"
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
         <div style={{ marginTop: "50px", textAlign:"center" }}>  <Button type="submit"  >Register</Button></div>
        
      </div>
     
    </div>
  );
}

export default Register;
