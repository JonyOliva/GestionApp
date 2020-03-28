import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/">
        <Navbar >Gestion App</Navbar>
      </Route>
      <Route path="/Compras">
        <h1>COMPRAS</h1>
      </Route>
    </Router>
  );
}

export default App;
