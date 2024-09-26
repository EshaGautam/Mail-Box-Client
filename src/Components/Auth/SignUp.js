import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { useRef } from "react";
import { Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authAction } from "../../Store/AuthSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [signup, setSignup] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleHandler = () => {
    setSignup((prev) => !prev);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      let url;
      if (signup) {
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
          throw new Error("Passwords Are not matching");
        }
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT1sUFfNQfAwVIvxpAWIAXmcNdNb0DLpY";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAT1sUFfNQfAwVIvxpAWIAXmcNdNb0DLpY";
      }

      const userdata = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const response = await userdata.json();
      if (userdata.ok) {
        dispatch(authAction.login(response.idToken));
        dispatch(authAction.setUserEmail(response.email));
        history.replace("/home");
        console.log("User Logged In Successfully");
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="form-style">
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <h2 className="auth-head">{signup ? "Sign Up" : "Login"}</h2>
          <Form className="form-main" onSubmit={submitHandler}>
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
            {signup && (
              <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                <Form.Label>Confirm-Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm-Password"
                  ref={confirmPasswordRef}
                />
              </Form.Group>
            )}
            <button type="submit" className="auth-btn">
              {signup ? "SignUp" : "Login"}
            </button>
          </Form>
        </Card.Body>
      </Card>
      <button
        className={signup ? "toggle-btn-signup" : "toggle-btn-signin"}
        onClick={toggleHandler}
      >
        {signup ? "Have an account?Login!" : "Don't have an account?Sign Up!"}
      </button>
    </div>
  );
};
export default SignUp;
