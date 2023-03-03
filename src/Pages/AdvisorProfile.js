import React from "react";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Sidenav } from "../Components/sidenav";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import picprofile from "../Images/picprofile.png";
import "../styles/advprofile.css";
import Navbar2 from "../Components/navbar2";

export const AdviserProfile = () => {
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [company, setcompany] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [address, setaddress] = useState("");
  const [adbisorId, setadbisorId] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("JWT-Token");
    if (token == "") {
      alert("not authorized");
    }

    let ntoken = "Bearer " + token.replaceAll('"', "");

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
          setaddress(data.address);
          setcity(data.city);
          setfirstName(data.firstName);
          setlastname(data.lastName);
          setemail(data.email);
          setphone(data.phone);
          setcompany(data.company);
          setstate(data.state);
          setadbisorId(data.advisorID);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }, []);

  const edit = (e) => {
    setDisabled(false);

  };
  const save = (e) => {
    
    let token = localStorage.getItem("JWT-Token");
    if (token == "") {
      alert("not authorized");
      window.location = "/loginadv";
    }
    token = "Bearer " + token.replaceAll('"', "");
    e.preventDefault();
    let values = {
      lastName: lastname,
      firstName: firstname,
      company: company,
      address: address,
      city: city,
      state: state,
      phone: phone,
      email: email,
      advisorID: adbisorId,
    };
    if (lastname != "" && firstname != "" && /^([0-9]{10})$/.test(phone) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      setDisabled(true);
    
    try {
      fetch(
        "https://localhost:7061/api/User/Update",
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            Authorization: token,
            "Access-Control-Max-Age": 86400,
          },
          body: JSON.stringify(values),
        }
      )
        

        .then((data) => {
          if (data === "Undefined") alert("some error occured");
          console.log(data);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
    }
  };

  return (
    <>
      <Navbar2 />
      <div id="everythingg">
      <section className="100vh">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" className="mb-4 mb-lg-0" style={{ border: "none" }}>
              <MDBCard className="mb-3" style={{ borderRadius: "40px" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-black"
                  >
                    <div style={{ marginTop: "20%" }}>
                      <MDBCardImage
                        src={picprofile}
                        alt="Avatar"
                        style={{ width: "50%", backgroundColor: "#F58142" }}
                        fluid
                      />
                      <MDBTypography tag="h5">
                        {firstname} {lastname}
                      </MDBTypography>
                      <MDBCardText>
                        <h2 style={{ marginBottom: "15%" }}>Advisor</h2>
                      </MDBCardText>
                    </div>
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">
                        <h3>Advisor Id</h3>{" "}
                      </MDBTypography>
                      <MDBCardText className="text-muted">
                        {adbisorId}
                      </MDBCardText>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol
                          size="6"
                          className="mb-3"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          {!disabled && (
                            <Form.Group>
                          <MDBTypography tag="h6">First Name</MDBTypography>
                          <Form.Control
                              required = {true}
                              value={firstname}
                              onChange={(e) => setfirstName(e.target.value)}
                              type="text"
                              placeholder="Enter First Name"
                            /><span>Please enter First Name </span>
                            </Form.Group>
                          )}
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                        {!disabled && (
                            <Form.Group>
                          <MDBTypography tag="h6">Last Name</MDBTypography>
                          <Form.Control
                          required = {true}
                              value={lastname}
                              onChange={(e) => setlastname(e.target.value)}
                              type="text"
                              placeholder="Enter Last Name"
                            /><span>Please enter Last Name </span>
                            </Form.Group>
                          )}
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol
                          size="6"
                          className="mb-3"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          <MDBTypography tag="h6">Email</MDBTypography>
                          {disabled && (
                            <MDBCardText className="text-muted">
                              {email}
                            </MDBCardText>
                          )}
                          {!disabled && (
                            <Form.Group>
                            <Form.Control
                              value={email}
                              required = {true}
                              onChange={(e) => setemail(e.target.value)}
                              type="email"
                              placeholder="Email"
                            /><span>Please enter a valid Email</span></Form.Group>
                          )}
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          {disabled && (
                            <MDBCardText className="text-muted">
                              {phone}
                            </MDBCardText>
                          )}
                          {!disabled && (
                            <Form.Group>
                            <Form.Control
                              value={phone}
                              required = {true}
                              onChange={(e) => setphone(e.target.value)}
                              type="tel"
                              pattern="[0-9]{10}"
                              placeholder="Phone Number"
                            /><span>Please Enter a valid Phone Number</span></Form.Group>
                          )}
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Company</MDBTypography>
                          {disabled && (
                            <MDBCardText className="text-muted">
                              {company}
                            </MDBCardText>
                          )}
                          {!disabled && (
                            <Form.Control
                              value={company}
                              onChange={(e) => setcompany(e.target.value)}
                              type="text"
                              placeholder="Company"
                            />
                          )}
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address</MDBTypography>
                          {disabled && (
                            <MDBCardText className="text-muted">
                              {address}
                            </MDBCardText>
                          )}
                          {!disabled && (
                            <Form.Control
                              value={address}
                              onChange={(e) => setaddress(e.target.value)}
                              type="text"
                              placeholder="Address"
                            />
                          )}
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">City</MDBTypography>
                          {disabled && (
                            <MDBCardText className="text-muted">
                              {city}
                            </MDBCardText>
                          )}
                          {!disabled && (
                            <Form.Control
                              value={city}
                              onChange={(e) => setcity(e.target.value)}
                              type="text"
                              placeholder="City"
                            />
                          )}
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">State</MDBTypography>
                          {disabled && (
                            <MDBCardText className="text-muted">
                              {state}
                            </MDBCardText>
                          )}
                          {!disabled && (
                            <Form.Control
                              value={state}
                              onChange={(e) => setstate(e.target.value)}
                              type="text"
                              placeholder="State"
                            />
                          )}
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                    
                  </MDBCol>
                </MDBRow>
              </MDBCard>
              {disabled && <Button id="btnSave" onClick={edit}>edit</Button>}
              {!disabled && <Button id="btnSave" onClick={save}>save</Button>}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      </div>
    </>
  );
};
