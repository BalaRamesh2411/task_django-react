import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./Components/View";
import Contact_details from "./Components/Contact_details";
import Create from "./Components/Create";
import Edit from "./Components/Edit";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Contact_details />}></Route>
          <Route path="/create" element={<Create />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
