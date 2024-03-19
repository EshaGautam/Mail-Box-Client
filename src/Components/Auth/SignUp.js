import React from "react";
import "./SignUp.css";
import { useRef } from "react";
import { Card, Form } from "react-bootstrap";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSignUp = async (event) => {
    try {
      event.preventDefault();
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        throw new Error("Passwords Are not matching");
      }
      const userdata = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT1sUFfNQfAwVIvxpAWIAXmcNdNb0DLpY",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const response = await userdata.json();
      if (userdata.ok) {
        console.log("User Logged In Successfully");
      } else {
        throw new Error("Problem in signUp");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="form-style">
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <h2 className="auth-head">Sign Up</h2>
          <Form className="form-main" onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm-Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm-Password"
                ref={confirmPasswordRef}
              />
            </Form.Group>
            <button type="submit" className="auth-btn">
              SignUp
            </button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default SignUp;
