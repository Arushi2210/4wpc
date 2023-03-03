import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import InputGroup from "react-bootstrap/InputGroup";
import { Row, Col } from "react-bootstrap";
import { padding } from "@mui/system";
import { MDBIcon, MDBRow, MDBCol } from "mdb-react-ui-kit";
import swal from "sweetalert";
export const Edit = ({
  strategyid,
  investmentAmount,
  listofinvestment,
  setlistofinvestment,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState(investmentAmount);
  let { EcliID } = useParams();
  const funcEdit = () => {
    setDisabled(false);
  };
  const funcSave = (e) => {
    setDisabled(true);
    const listItems = (listofinvestment || []).map((it) =>
      it.strategyid === strategyid ? { ...it, investmentAmount: value } : it
    );
    setlistofinvestment(listItems);
    const mylist = (listofinvestment || []).map((it) =>
      it.strategyid === strategyid ? { ...it, investmentAmount: value } : {}
    );
    let id = 0;
    for (var i = 0, size = listItems.length; i < size; i++) {
      var item = listItems[i];
      if (item.strategyid === strategyid) {
        id = i;
      }
    }
    console.log("00");
    console.log(listItems);
    listItems[id].clientID = EcliID;

    console.log(listItems[0]);
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

    try {
      fetch(`https://localhost:7061/api/Investment/update`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
          Authorization: token,
          "Access-Control-Max-Age": 86400,
        },
        body: JSON.stringify(listItems[id]),
      }).then((data) => {
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
  };
  return (
    <>
      {disabled && (
        <Row>
          <Col xs={10} sm style={{ padding: "0px" }}>
            <Form.Label>{investmentAmount}</Form.Label>
          </Col>
          <Col sm style={{ padding: "0px" }}>
            <Button variant="dark" onClick={funcEdit}>
              <MDBIcon far icon="edit" />
            </Button>
          </Col>
        </Row>
      )}
      {!disabled && (
        <Row>
          <Col xs={7} style={{ padding: "0px" }}>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </Col>
          <Col style={{ padding: "0px" }}>
            <Button variant="dark" onClick={funcSave}>
              <MDBIcon fas icon="check" />
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};
