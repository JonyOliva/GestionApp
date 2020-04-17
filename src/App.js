import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import InicioComponent from "./components/InicioComponent";
import ValoresComponent from "./components/ValoresComponent";
import ComprasComponent from "./components/ComprasComponent";
import VentasComponent from "./components/VentasComponent";
import ReportesComponent from "./components/ReportesComponent";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/">
        <Navbar>Gestion App</Navbar>
      </Route>
      <Route exact path="/">
        <InicioComponent />
      </Route>
      <Route path="/compras">
        <ComprasComponent />
      </Route>
      <Route path="/valores">
        <ValoresComponent />
      </Route>
      <Route path="/ventas">
        <VentasComponent />
      </Route>
      <Route path="/reportes">
        <ReportesComponent />
      </Route>
    </Router>
  );
}

export default App;
