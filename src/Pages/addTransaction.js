import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { Navbarr } from "../Components/navbar";

import "../styles/addTransaction.css";
export const AddTransaction = () => {
  return (
    <>
      <div className="everything" id="displaytable" style="visibility: hidden">
        <Form>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter investment name" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Select aria-label="Default select example">
                <option>Investment Type</option>
                <option value="1">Type-1</option>
                <option value="2">Type-2</option>
                <option value="3">Type-3</option>
              </Form.Select>
            </Form.Group>
          </Row>

          
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Control type="text" placeholder="Strategy Name" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Control type="text" placeholder="Account ID" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Control type="text" placeholder="Modle APLID" />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Control type="number" placeholder="Investment Amount" />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Select aria-label="Default select example">
              <option>active</option>
              <option value="1">0</option>
              <option value="2">1</option>
            </Form.Select>
          </Form.Group>
          <Button >Add Investment</Button>
        </Form>
      </div>
    </>
  );
};
