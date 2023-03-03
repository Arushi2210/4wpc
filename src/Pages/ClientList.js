import React from "react";
import { Button, Table } from "react-bootstrap";
import { Sidenav } from "../Components/sidenav";
import { useEffect, useState } from "react";
import "../styles/clientlist.css";
import { MDBIcon } from "mdb-react-ui-kit";
import Navbar2 from "../Components/navbar2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";

export const ClientList = () => {
  const [clientsList, setClientsList] = useState([]);

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
      fetch("https://localhost:7061/api/User/GetAllClients", {
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
          setClientsList(data);
        });
    } catch (error) {
      console.log("Error-> ", error);
    }
  }, []);

  const editdetails = (c) => {
    window.location = "/editDetails/" + c;
  };

  const deleteclient = (c) => {
    let token = localStorage.getItem("JWT-Token");
    swal(token);
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
      fetch(`https://localhost:7061/api/User/Delete?id=${c}`, {
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

  const cli = clientsList.map((e, ind) => {
    return (
      <tr key={ind}>
        <td style={{ alignItems: "left" }}>
          <label>{e.clientID}</label>
        </td>
        <td style={{ alignItems: "left" }}>
          <Button
            href={"/clientDetails/" + e.clientID}
            className="btnClientName"
            variant="link"
          >
             {e.lastName} {", "} {e.firstName}
          </Button>
        </td>
        <td style={{ alignItems: "left" }}>{e.email}</td>
        <td style={{ alignItems: "left" }}>{e.phone}</td>
        <td style={{ alignItems: "left" }}>
          <div>


            {/* <DeleteIcon onClick={() => deleteclient(e.clientID)}></DeleteIcon> */}
          
  
         
           <DeleteIcon onClick={() => handleDeleteClient(e.clientID)}></DeleteIcon>
           

          </div>
        </td>
      </tr>
    );
  });

  const handleDeleteClient = (clientID) => {
           
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this client !",
      icon: "Warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        // Call delete client function here
        deleteclient(clientID);
        swal("Your Client has been deleted!", {
          icon: "Success",
        });
      } else {
        swal("Your Client is safe!");
      }
    })
  }
     
  return (
    <>
      <Navbar2 />
      <div id="everything">
      <div className="container" style={{ marginTop: "7%" }}>
        <br />
        {!(clientsList.length == 0) && (
          <Table
            style={{ marginBottom: "3%" }}
            className="rounded-table"
            responsive
            hover
            id="table"
          >
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Phone No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{cli}</tbody>
          </Table>
        )}
        {clientsList.length == 0 && (
          <h3>
            You don't have any client , click on add new client to add client
          </h3>
        )}
        <Button
          href="/addclient"
          className="addnewclient"
          style={{
            fontFamily: "Arial",
            borderRadius: "14px",
            backgroundColor: "#333333",
          }}
        >
          Add New Client
        </Button>
      </div>
      </div>
    </>
  );
};
