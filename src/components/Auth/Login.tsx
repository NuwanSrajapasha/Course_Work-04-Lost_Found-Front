import { Button, Form } from "react-bootstrap";

export function Login(){
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
      <h1 style={{ marginBottom: "50px" }}>Hello to Lost Found Hub</h1>

      {/*  SUB HEADING CENTERED */}
      <h3 style={{ marginBottom: "30px" }}>Login</h3>

      {/* FORM CONTAINER ALSO CENTERED */}
      <div style={{ maxWidth: "320px", width: "100%" }}>
       
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
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
         <div style={{ marginTop: "50px", textAlign:"center" }}>  <Button type="submit"  >Login</Button></div>
        
      </div>
     
    </div>
  );
}
export default Login;