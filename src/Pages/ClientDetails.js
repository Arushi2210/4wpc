import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../styles/clientDetails.css";
import { useState, useEffect } from "react";
import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { Edit } from "./Edit";
import Feedback from 'react-bootstrap/Feedback'

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
import picprofile from "../Images/picprofile.png";
import "../styles/advprofile.css";
import Navbar2 from "../Components/navbar2";
import DeleteIcon from "@mui/icons-material/Delete";
import { Email } from "@mui/icons-material";
import swal from "sweetalert";

export const ClientDetails = () => {
  let { EcliID } = useParams();
  const [Total, setTotal] = useState(0.0);
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [company, setcompany] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [address, setaddress] = useState("");
  const [adbisorId, setadbisorId] = useState("");
  const [listofinvestment, setlistofinvestment] = useState([]);
  const [cont, setCont] = useState(false);
  const [renderlist, setrenderlist] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [investmentname, setInvestmentname] = useState("");
  const [investmenttype, setInvestmenttype] = useState("");
  const [strategyName, setStrategyname] = useState("");
  const [accountid, setAccountid] = useState("string");
  const [modelAPLid, setModelAPLid] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [activestatus, setActivestatus] = useState(1);
  const [validated, setValidated] = useState(false);

  const func = () => {
    if (cont === false) {
      setCont(true);
    }
  };

  const funcSave = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      setValidated(true);}
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

    let values = {
      clientID: EcliID,
      investmentName: investmentname,
      active: activestatus,
      investmentTypeName: investmenttype,
      strategyid: 0,
      strategyName: strategyName,
      accountID: accountid,
      modelAPLID: modelAPLid,
      investmentAmount: investmentAmount,
    };
    if (investmentname != "" && investmentAmount != "" && strategyName !="" && modelAPLid != "" && investmenttype != ""){
      setCont(false);
    try {
      console.log("made a fetch call");
      fetch("https://localhost:7061/api/Investment/Create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: token,
          "Access-Control-Max-Age": 86400,
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status === 200) {
            swal({
              title: "Investment Added",
              icon: "Success",
              button: "OK"
            });
            window.location = "/clientDetails/" + EcliID;
          }
          if (res.status !== 200) {
            swal(res.status);
          }
        })
        .then((data) => {
          if (data === "Undefined") {
            swal({
              title: "Some Error Occured",
              text: "Try Again",
              icon: "Warning",
              button: "OK"
            });
          }
          console.log(data);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
    setCont(false);
  }
  };

  const deleteinvestment = (id) => {
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
      fetch(`https://localhost:7061/api/Investment/delete?request=${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: token,
          "Access-Control-Max-Age": 86400,
        },
      })
        .then((res) => res.text())
        .then((data) => {
          swal({
            title: "Success",
            icon: "Success",
            button: "OK"
          });
          window.location.reload();
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
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
      window.location = "/loginadv";
    }
    token = "Bearer " + token.replaceAll('"', "");

    try {
      fetch(`https://localhost:7061/api/User/clientInfo?id=${EcliID}`, {
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
      fetch(
        `https://localhost:7061/api/Investment/GetTotalInvestment?clientID=${EcliID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            Authorization: token,
            "Access-Control-Max-Age": 86400,
          },
        }
      )
        .then((res) => res.text())
        .then((data) => {
          setTotal(data);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }, [firstname, listofinvestment]);

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
      fetch(
        `https://localhost:7061/api/Investment/GetInvestmentInformation?clientid=${EcliID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
            Authorization: token,
            "Access-Control-Max-Age": 86400,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setlistofinvestment(data);
          if (Object.keys(data).length > 0) setrenderlist(true);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }, [Total]);

  const cli = listofinvestment.map((e, ind) => {
    return (
      <tr key={ind}>
        <td style={{ alignItems: "left" }}>
          <label>{e.investmentName}</label>
        </td>
        <td style={{ alignItems: "left" }}>
          <Button
            href={"/clientDetails/" + EcliID}
            className="btnClientName"
            variant="link"
          >
            {e.investmentTypeName}
          </Button>
        </td>
        <td style={{ alignItems: "left" }}>{e.active}</td>
        <td style={{ alignItems: "left" }}>{e.strategyName}</td>
        <td style={{ alignItems: "left" }}>{e.accountID}</td>
        <td style={{ alignItems: "left" }}>{e.modelAPLID}</td>
        <td style={{ alignItems: "left" }}>
          <Edit
            strategyid={e.strategyid}
            investmentAmount={e.investmentAmount}
            listofinvestment={listofinvestment}
            setlistofinvestment={setlistofinvestment}
          />
        </td>

        <td style={{ alignItems: "left" }}>
          <DeleteIcon
            onClick={() => deleteinvestment(e.strategyid)}
          ></DeleteIcon>
        </td>
      </tr>
    );
  });
  const edit = (e) => {
    setDisabled(false);
  };
  const save = (e) => {
    
    e.preventDefault();
    const form = e.currentTarget;
   

    if (form.checkValidity() === true) {
      setValidated(true);
    }
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
      advisorID: "string",
      clientID: EcliID,
    };
    if (lastname != "" && firstname != "" && /^([0-9]{10})$/.test(phone) && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ){
      console.log("00000")
      setDisabled(true);
    try {
      fetch(`https://localhost:7061/api/User/Update?ClientId=${EcliID}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: token,
          "Access-Control-Max-Age": 86400,
        },
        body: JSON.stringify(values),
      }).then((data) => {
        if (data === "Undefined")  
         swal({
          title: "Some error occured",
          text: "Try Again",
          icon: "Warning",
          button: "OK"
        });
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
              <MDBCol
                lg="10"
                className="mb-4 mb-lg-0"
                style={{ border: "none" }}
              >
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
                          {lastname} {", "} {firstname}
                        </MDBTypography>
                        <MDBCardText>
                          <h2 style={{ marginBottom: "15%" }}>Client</h2>
                        </MDBCardText>
                      </div>
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <div className="hstack gap-3">
                          <div className="vstack gap-6">
                            <MDBTypography tag="h6">
                              <h3>Client Id</h3>{" "}
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              {adbisorId}
                            </MDBCardText>
                          </div>
                          <div className="vstack gap-6">
                            <MDBTypography tag="h6">
                              <h3>Total Investment</h3>{" "}
                            </MDBTypography>
                            <MDBCardText className="text-muted">
                              <h5>${Total}</h5>{" "}
                            </MDBCardText>
                          </div>
                        </div>
                        <hr className="mt-0 mb-4" />

                        <MDBRow className="pt-1">
                          <MDBCol
                            size="6"
                            className="mb-3"
                            style={{ backgroundColor: "#ffffff" }}
                          >
                            {!disabled && (
                              <Form.Group>
                                <MDBTypography tag="h6">
                                  First Name
                                </MDBTypography>
                                <Form.Control
                                  required={true}
                                  value={firstname}
                                  onChange={(e) => setfirstName(e.target.value)}
                                  type="text"
                                  placeholder="Enter first name"
                                />
                                <span>First Name cannot be empty</span>
                              </Form.Group>
                            )}
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            {!disabled && (
                              <Form.Group>
                                <MDBTypography tag="h6">
                                  Last Name
                                </MDBTypography>
                                <Form.Control
                                  required={true}
                                  value={lastname}
                                  onChange={(e) => setlastname(e.target.value)}
                                  type="text"
                                  placeholder="Enter last name"
                                />
                                <span>Last Name cannot be empty</span>
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
                                  required={true}
                                  value={email}
                                  onChange={(e) => setemail(e.target.value)}
                                  type="email"
                                  placeholder="Enter email"
                                />
                                <span>Please enter a valid email</span>
                              </Form.Group>
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
                                  required={true}
                                  value={phone}
                                  onChange={(e) => setphone(e.target.value)}
                                  type="tel"
                                  placeholder="Phone Number"
                                  pattern="[0-9]{10}"
                                />
                                <span>Please enter a valid Phone Number</span>
                              </Form.Group>
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
                                placeholder="State"
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
                                type="phone"
                                placeholder="State"
                              />
                            )}
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
                {disabled && (
                  <Button id="btnSave" onClick={() => edit()}>
                    Edit
                  </Button>
                )}
                {!disabled && (
                  <Button id="btnSave" onClick={save}>
                    Save
                  </Button>
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <h1 className="clientname">Client Investment Details</h1>
        {!(listofinvestment.length==0) &&
          <Table
            className="rounded-table"
            hover
            responsive
            id="table"
            style={{ margin: "2%", width: "92%", textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Investment Name</th>
                <th>Investment Type</th>
                <th>Active Status</th>
                <th>Investment Strategy</th>
                <th>Account ID</th>
                <th>Model APL ID</th>
                <th style={{ width: "20%" }}>Amount Invested</th>
                <th>Delete Investment</th>
              </tr>
            </thead>
            <tbody>{renderlist ? cli : <tr></tr>}</tbody>
          </Table>
        }{(listofinvestment.length == 0) && <h4 id="notPresent">There is no investment present.</h4>}

        <Button
          onClick={func}
          id="btnAddInves"
          style={{
            fontFamily: "Arial",
            borderRadius: "14px",
            width: "fit-content",
            borderTop: "0px",
          }}
        >
          Add Investment
        </Button>
        {cont && (
          <div className="contAddTrans">
            <Form className="formAddTrans" noValidate validated={validated}>
              <Row>
                <Form.Group
                  as={Col}
                  sm
                  className="mb-4"
                  controlId="formBasicEmail"
                  onChange={(e) => {
                    setInvestmentname(e.target.value);
                  }}
                >
                  <Form.Control
                    required={true}
                    type="text"
                    placeholder="Investment name"
                  /><Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                  
                </Form.Group>

                <Form.Group as={Col} sm style={{ paddingBottom: "15px" }}>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    onChange={(e) => {
                      setInvestmenttype(e.target.value);
                    }}
                  >
                    <option>Investment Type</option>
                    <option value="Type-1">Type-1</option>
                    <option value="Type-2">Type-2</option>
                    <option value="Type-3">Type-3</option>
                  </Form.Select><Form.Control.Feedback type="invalid">Please select a investment type</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm className="mb-3">
                  <Form.Control
                    required={true}
                    type="text"
                    placeholder="Strategy Name"
                    onChange={(e) => {
                      setStrategyname(e.target.value);
                    }}
                  /><Form.Control.Feedback type="invalid">Please select a investment type</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm className="mb-3">
                  <Form.Control
                    required={true}
                    type="text"
                    placeholder="Modle APLID"
                    onChange={(e) => {
                      setModelAPLid(e.target.value);
                    }}
                  /><Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm className="mb-3">
                  <Form.Control
                    required={true}
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => {
                      setInvestmentAmount(e.target.value);
                    }}
                  /><Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm className="mb-3">
                  <Button
                    id="btnSave"
                    onClick={funcSave}
                    style={{ marginLeft: "5%" }}
                  >
                    Save
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};
