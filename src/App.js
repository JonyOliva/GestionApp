import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import ProductsTable from "./components/ProductsTable";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/">
        <Navbar>Gestion App</Navbar>
      </Route>
      <Route path="/Compras">
        <div className="container mt-2">
        <h4>Compras</h4>
        <ProductsTable />
        </div>
      </Route>
    </Router>
  );
}

export default App;
