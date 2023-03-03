import { Sidenav } from "../Components/sidenav";
import Form from "react-bootstrap/Form";
import React, { Component, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Footer } from "../Components/footer";
import { useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "../styles/addclient.css";
import Navbar2 from "../Components/navbar2";
import swal from "sweetalert";

export const AddClient = () => {
  // const [firstname,setfirstName]=useState("");
  // const [lastname,setlastname]=useState("");
  // const [email,setemail]=useState("");
  // const [phone,setphone]=useState("");
  // const [company,setcompany]=useState("");
  // const [city,setcity]=useState("");
  // const [state,setstate]=useState("");
  // const [address,setaddress]=useState("");
  const [adbisorId, setadbisorId] = useState("");

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [bearertoken, setBearertoken] = useState("");
  const [validated, setValidated] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    let token = localStorage.getItem("JWT-Token");
    if (token == "") {
      swal({
        title: "Sorry",
        text: "your are not authorized for this feature",
        icon: "Warning",
        button: "OK"
      });
    }

    let ntoken = "Bearer " + token.replaceAll('"', "");
    setBearertoken(ntoken);
    try {
      console.log("made a get call");
      fetch("https://localhost:7061/api/User/AdvisorInfo", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: ntoken,
          "Access-Control-Max-Age": 86400,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // setaddress(data.address);
          // setcity(data.city);
          // setfirstName(data.firstName);
          // setlastname(data.lastName);
          // setemail(data.email);
          // setphone(data.phone);
          // setcompany(data.company);
          // setstate(data.state);
          setadbisorId(data.advisorID);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }, []);

  const Register = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      setValidated(true);
    };
    let values = {
      firstName: firstName,
      lastName: lastName,
      roleID: 2,
      email: Email,
      advisorID: adbisorId,
      phone: Phone,
      company: Company,
      address: Address,
      city: City,
      state: State,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      fetch("https://localhost:7061/api/User/Registration", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: bearertoken,
          "Access-Control-Max-Age": 86400,
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 200)  swal({
            title: "User Registered",
            icon: "Success",
            button: "OK"
          });
        })
        .then((data) => {
          if (data === "Undefined")   swal({
            title: "Some Error Occured",
            text: "Try Again",
            icon: "Warning",
            button: "OK"
          });
          console.log(data);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  };
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    setIsPasswordValid(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/.test(
        password
      )
    );
    if (confirmPassword) {
      setIsConfirmPasswordValid(confirmPassword === password);
    }
  };
  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    setIsConfirmPasswordValid(confirmPassword === password);
  };
  return (
    <>
      <Navbar2 />
      <div className="everything">
      <div className="container" style={{ marginTop: "0%" }}>
        <center>
          <Form
            noValidate
            validated={validated}
            style={{
              borderRadius: "20px",
              boxShadow: "6px 6px 4px rgba(0, 0, 0, 0.2)",
              
            }}
            onSubmit={handleSubmit}
            className="signUpForm"
            id="signUpForm"
          >
            <center>
              <img
                style={{ width: "16%", height: "41%" }}
                className="logoimg"
                src={require("../Images/logo.png")}
                alt="logo"
              />
              <span style={{ fontWeight: "700", fontSize: "120%" }}>
                {" "}
                Add Client
              </span>

              <p>
                Enter details of new<b> Client</b> here
              </p>
              <hr></hr>
            </center>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    required
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    placeholder="First name"
                  />
                  <Form.Control.Feedback type="invalid">Enter first name of client</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    required
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    placeholder="Last name"
                  />
                  <Form.Control.Feedback type="invalid">Enter last name of client</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    required
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                  <Form.Control.Feedback type="invalid">Enter Email-id of client</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    required
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Phone"
                  />
                  <Form.Control.Feedback type="invalid">Enter phone number of client</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md
                controlId="formGridEmail"
                className="mb-3"
              >
                <Form.Control
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  isInvalid={!isPasswordValid}
                  placeholder="Set a password"
                />
                <Form.Control.Feedback type="invalid">Password must have at least one lowercase letter, one uppercase letter,
          one special character, one numeric digit and be at least 8 characters long.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md controlId="formGridPassword">
                {/* <Form.Label>Confirm Password</Form.Label> */}
                <Form.Control
                required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  placeholder="Confirm password"
                  isInvalid={!isConfirmPasswordValid}
                />
                <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                
              </Form.Group>
            </Row>
            <center>
              <Button
                id="btnSave"
                style={{
                  fontFamily: "Arial",
                  borderRadius: "14px",
                  borderTop: "10%",
                }}
                onClick={Register}
                type="submit"
              >
                Register Client
              </Button>
            </center>
          </Form>
        </center>
      </div>
      </div>
    </>
  );
};

export default AddClient;
