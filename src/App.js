import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Routes>
      </Router>
      <ToastContainer /> 
    </>
  );
};

export default App;
