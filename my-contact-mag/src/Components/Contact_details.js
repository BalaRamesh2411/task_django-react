import React, { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/contactdetails/contact/");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch contact details");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/contactdetails/contact/delete/${id}/`);
      alert("Contact deleted successfully!");
      getData();
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const handleCreate = () => navigate("/create");
  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleView = (id) => navigate(`/view/${id}`);


  const filteredContacts =
    searchName.trim() === ""
      ? contacts 
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchName.toLowerCase())
        );

  return (
    <>
      <div className="container mt-3">
      
        <div className="d-flex justify-content-between mb-3">
          <h2>Contact Management</h2>
          <Form.Control
            type="text"
            placeholder="Search by Name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-25"
          />
        </div>

        <div className="d-flex justify-content-center my-3">
          <Button variant="primary" onClick={handleCreate} className="w-50">
            Create Contact
          </Button>
        </div>

        <h2 className="text-center mb-4">Contact List</h2>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
       
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address}</td>
                  <td>
                    <div className="d-flex gap-3 flex-wrap">
                      <Button variant="info" size="sm" onClick={() => handleView(contact.id)}>
                        View
                      </Button>
                      <Button variant="warning" size="sm" onClick={() => handleEdit(contact.id)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(contact.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ContactDetails;


