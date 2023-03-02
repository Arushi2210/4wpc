import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { BiSave } from "react-icons/bi";
import { apiRequest } from "./apiRequest";

export const Roww = ({
  placeholder,
  items,
  setItems,
  id,
  API_AdviserClientList,
  place,
}) => {
  
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Company, setCompany] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Address, setAddress] = useState("");
  const [value, setValue] = useState(placeholder);
  const [disabled, setDisabled] = useState(true);

  const handleEditClick = (e) => {
    setDisabled(false);
  };

  const handleSaveClick = async () => {
    setDisabled(true);
    //save logic goes here
    let token = localStorage.getItem("JWT-Token");

    if (token == "") {
      alert("not authorized");
      window.location = '/loginadv'
    }
    token = "Bearer " + token.replaceAll('"', '');
    
    
  };
  
  return (
    <>
      <div>
        <InputGroup>
          <Form.Control
            type="text"
            className="form-reset inline-input"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
          />
          {disabled && (
            <Button
              variant="outline-secondary"
              onClick={() => handleEditClick()}
            >
              <BiEdit />
            </Button>
          )}
          {!disabled && (
            <Button
              variant="outline-secondary"
              onClick={handleSaveClick}
              className="hidden inline-button save-val-btn"
            >
              <BiSave />
            </Button>
          )}
        </InputGroup>
      </div>
    </>
  );
};