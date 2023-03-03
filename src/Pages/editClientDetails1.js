import Form from "react-bootstrap/Form";
import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import { Footer } from "../Components/footer";
import { MDBIcon } from "mdb-react-ui-kit";
import "../styles/editClientDetails1.css";
import Navbar2 from "../Components/navbar2";
import { useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { BiSave } from "react-icons/bi";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Container } from "react-bootstrap";
import { Sidenav } from "../Components/sidenav";
import { useState, useEffect } from "react";
import picprofile from "../Images/picprofile.png";
import { Roww } from "./row";
import { Input } from "@mui/material";
import swal from "sweetalert";

export const EditClientDetails = () => {
  let { EcliID } = useParams();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Address, setAddress] = useState("");
  const [disabledfn, setDisabledfn] = useState(true);
  const [disabledln, setDisabledln] = useState(true);
  const [disabledem, setDisabledem] = useState(true);
  const [disabledpn, setDisabledpn] = useState(true);
  const [disabledco, setDisabledco] = useState(true);
  const [disabledci, setDisabledci] = useState(true);
  const [disabledst, setDisabledst] = useState(true);
  const [disabledad, setDisabledad] = useState(true);


  
  useEffect(() => {
    let token = localStorage.getItem("JWT-Token");

    if (token == "") {

      swal({
        title: "Sorry",
        text: "your are not authorized for this feature",
        icon: "Warning",
        button: "OK"
      });
      window.location = "/loginadv";
    }
    token = "Bearer " + token.replaceAll('"', "");

    try {
      console.log("made a get call");
      fetch(`https://localhost:7061/api/User/client-Info?id=${EcliID}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: token,
          "Access-Control-Max-Age": 86400,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAddress(data.address);
          setCity(data.city);
          setFirstname(data.firstName);
          setLastname(data.lastName);
          setEmail(data.email);
          setPhone(data.phone);
          setCompany(data.company);
          setState(data.state);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  },[]);

  const handleEditClick = () => {
    setDisabledfn(false);
  };

  const handleSaveClick = (e) => {
    let token = localStorage.getItem("JWT-Token");
    if (token == "") {
      swal({
        title: "Sorry",
        text: "your are not authorized for this feature",
        icon: "Warning",
        button: "OK"
      });
        window.location = '/loginadv'
      }
      token = "Bearer " + token.replaceAll('"', '');
      e.preventDefault();
      let values = {
        
          "lastName": lastName,
          "firstName": firstName,
          "company": Company,
          "address": Address,
          "city": City,
          "state": State,
          "phone": Phone,
          "email": Email,
          "advisorID": "string"
        
      };

      try {

        fetch(`https://localhost:7061/api/User/Update-client-personal-info?ClientId=${EcliID}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            "Authorization": token,
            "Access-Control-Max-Age": 86400
          },
          body: JSON.stringify(values),
        })
          
          .then((data) => {
  
            if (data === "Undefined") 
            swal({
              title: "some error occured",
              text:  "Try Again",
              icon: "Warning",
              button: "OK"
            });
            console.log(data);
            
          });
      } catch (error) {
        console.log("Error-> ", error);
      }
  }

  return (
    <div className="everything">
    <div className="contEditDetails">
      <Row>
        <Col>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">Frist Name</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={firstName}
            onChange={(e) => {
                console.log(e.target.value)
              setFirstname(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledfn}
          />
          {disabledfn && (
            <Button
              variant="outline-secondary"
              onClick={() => handleEditClick()}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledfn && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup >
        </Col>
        <Col>
        <InputGroup >
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={lastName}
            onChange={(e) => {
                console.log(e.target.value)
              setLastname(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledln}
          />
          {disabledln && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledln(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledln && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={Email}
            onChange={(e) => {
                console.log(e.target.value)
              setEmail(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledem}
          />
          {disabledem && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledem(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledem && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup >
        </Col>
        <Col>
        <InputGroup >
        <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={Phone}
            onChange={(e) => {
                console.log(e.target.value)
              setPhone(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledpn}
          />
          {disabledpn && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledpn(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledpn && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup >
        
        <InputGroup.Text id="basic-addon1">Company</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={Company}
            onChange={(e) => {
                console.log(e.target.value)
              setCompany(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledco}
          />
          {disabledco && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledco(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledco && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup >
        </Col>
        <Col>
        <InputGroup >
        
        <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={Address}
            onChange={(e) => {
                console.log(e.target.value)
              setAddress(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledad}
          />
          {disabledad && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledad(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledad && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup >
        
        <InputGroup.Text id="basic-addon1">City</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={City}
            onChange={(e) => {
                console.log(e.target.value)
              setCity(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledci}
          />
          {disabledci && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledci(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledci && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup >
        </Col>
        <Col>
        <InputGroup >
        
        <InputGroup.Text id="basic-addon1">State</InputGroup.Text>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            value={State}
            onChange={(e) => {
                console.log(e.target.value)
              setState(e.target.value);
            }}
            placeholder={firstName}
            disabled={disabledst}
          />
          {disabledst && (
            <Button
              variant="outline-secondary"
              onClick={() => setDisabledst(false)}
            >
              <BiEdit />
            </Button>
          )}
          {!disabledst && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup>
        </Col>
      </Row>
    </div>
    </div>
  );
};
