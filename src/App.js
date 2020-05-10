import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/otros/Navbar.js";
import InicioComponent from "./components/inicio/InicioComponent";
import ValoresComponent from "./components/valores/ValoresComponent";
import ComprasComponent from "./components/compras/ComprasComponent";
import VentasComponent from "./components/ventas/VentasComponent";
import ReportesComponent from "./components/reportes/ReportesComponent";
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
