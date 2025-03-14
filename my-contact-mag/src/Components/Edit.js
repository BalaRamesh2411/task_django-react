import React, { useState ,useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();

  const handleEditData = async () => {
    const editData = await axios.get(
      `http://127.0.0.1:8000/contactdetails/contact/view/${id}`
    );
    setContact(editData.data);
    console.log(editData.data);
  };

  
  useEffect(() => {
    handleEditData(); 
  }, []);

const handleupdate = async (e) => { 
  e.preventDefault();

  let formData = new FormData();
  formData.append("name", contact.name);
  formData.append("email", contact.email);
  formData.append("phone", contact.phone);
  formData.append("address", contact.address);

  try {
    await axios.put(
      `http://127.0.0.1:8000/contactdetails/contact/update/${id}`,
      formData
    );

    alert("Updated successfully");
    navigate("/");  
  } catch (error) {
    console.error("Error updating contact:", error.message);
    alert("Failed to update contact");
  }
};

      
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 p-4 bg-light shadow rounded">
        <h2 className="text-center mb-4">Contact Form</h2>
        <Form onSubmit={(e)=>handleupdate(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={contact.name}
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
              value={contact.email}
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
              value={contact.phone}
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
              value={contact.address}
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="w-50">
              update Contact
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Edit;
