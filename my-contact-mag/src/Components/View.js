import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./View.css";

const View = () => {
  const [viewItem, setViewItem] = useState({});
  const { id} = useParams();
  const navigate = useNavigate();

  const handleEditData = async () => {
    const viewData = await axios.get(
      `http://127.0.0.1:8000/contactdetails/contact/view/${id}`
    );
    setViewItem(viewData.data);
    console.log(viewData.data);
  };

  useEffect(() => {
    handleEditData();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <div className="form-container">
    <div className="form-content">
      <h1>Student Detail</h1>
      <div className="detail">
        <h3>ID: {viewItem.id}</h3>
        <h3> Name: {viewItem.name}</h3>
        <h3>Email: {viewItem.email}</h3>
        <h3>PhoneNO: {viewItem.phone}</h3>
        <h3>Address: {viewItem.address}</h3>
       
      </div>
      <button onClick={handleBackClick} className="back-btn">
        Go to List
      </button>
    </div>
  </div>
  )
}

export default View