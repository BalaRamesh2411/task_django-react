import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    let formData = new FormData();
    formData.append("name", contact.name);
    formData.append("email", contact.email);
    formData.append("phone", contact.phone);
    formData.append("address", contact.address);

    axios.post("http://127.0.0.1:8000/contactdetails/contact/create", formData)
      .then((res) => {
        console.log(res, "res");
        alert("Created successfully");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to create contact");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 p-4 bg-light shadow rounded">
        <h2 className="text-center mb-4">Contact Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone number"
              name="phone"
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter address"
              name="address"
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-50">
              Save Contact
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Create;
