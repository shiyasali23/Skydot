import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="login-page">
      <Form className="login-form" noValidate validated={validated} onSubmit={handleSubmit}>

          <Form.Group  controlId="validationCustom01" className="login-form-group">
            <Form.Control type="text" placeholder="Username" required className="login-input"/>
            <Form.Control.Feedback type="invalid">
              Username Required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group  controlId="validationCustom02" className="login-form-group">
            <Form.Control type="text" placeholder="Password" required className=" login-input"/>
            <Form.Control.Feedback type="invalid">
                Password Required
            </Form.Control.Feedback>
          </Form.Group>
     
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
