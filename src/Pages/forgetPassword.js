import React from "react";
import { Footer } from "../Components/footer";
import Navbarr from "../Components/navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/forgetPassword.css";
import { useState } from "react";
import swal from "sweetalert";

export const ForgetPassword = () => {
  let res1 ;
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const ForgotPassword = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form.checkValidity())
  
    if (form.checkValidity() === true) {
      setValidated(true);
    };
    
    let values = {
      "email": email,
    };
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    try {
      
      fetch("https://localhost:7061/api/User/AdvisorForgot", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          "Access-Control-Max-Age": 86400,
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          res1 = res
          if (res.status == 200) {
            window.location = '/ResetPassword';

            return res.text();
          }
          return res.text();
        })
        .then((data) => {
          if (res1.status == 200){
          console.log(data);
          swal(data);}
          else {

          }
          
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }
  }
  return (
    <>
      <Navbarr />
      <div className="forgetPassword">
        <Form noValidate validated={validated} style={{ borderRadius: "20px", boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.2)" }}
          className="forgetPasswordForm"
          id="forgetPasswordForm">
          <h3 className="forgetPasswordHeader">Forgot Password</h3>
          <center> <p>
            Enter email to which reset link will be sent
          </p></center>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Control.Feedback type="invalid">
                  Please enter a valid Email
                </Form.Control.Feedback>
          </Form.Group>
          <center><Button style={{ fontFamily: "Arial", borderRadius: "14px", width: "50%", borderTop: "0px" }}
            variant="primary"
            type="submit"
            onClick={ForgotPassword}
            id="btnSave"
          >
            Submit
          </Button></center>
        </Form>
      </div>
      <Footer />
    </>
  );

}
