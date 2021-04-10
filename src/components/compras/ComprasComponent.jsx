import React, { Component } from 'react';
import { SesionContext } from "../inicio/SesionComponent";
import Tabs from "../otros/Tabs";
import ExistenciasTable from "./ExistenciasTable";
import { Alert } from "react-bootstrap";

class ComprasComponent extends Component {
  static contextType = SesionContext;

  state = { 
    existencias: []
  };

  render() {
    let alert = this.context.alert;
    return (
      <div className="container mt-2">
        <div className="d-flex">
          <h4 className="py-3">Compras</h4>
          <Alert
            className="ml-auto"
            variant={alert.style}
            show={alert.enable}
            onClose={this.AlertClose}
            dismissible
          >
            {alert.head} {"  "}
            {alert.msg}
          </Alert>
        </div>
        <Tabs headers={["Existencias"]} activo={0} onChange={() => {}} />
        <ExistenciasTable />
      </div>
    );
  }
}
 
export default ComprasComponent;