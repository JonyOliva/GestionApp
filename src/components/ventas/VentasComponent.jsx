import React, { Component } from 'react';
import InvoicesTable from "./InvoicesTable";
import Tabs from "../otros/Tabs";
import { FAC_URL } from '../../Constants';
import { Alert } from "react-bootstrap";

class VentasComponent extends Component {
  state = {
    facturas: [],
    alert: {
      enable: false,
      style: "",
      head: "",
      msg: "",
      timerId: undefined
    },
  }

  getInvoices = () => {
    fetch(FAC_URL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ facturas: json });
      })
      .catch((error) => {
        throw error;
      });
  }

  AlertClose = () => {
    const { alert } = this.state;
    this.setState({ alert: { ...alert, enable: false } });
  };

  render() {
    const { facturas, alert  } = this.state;
    return (
      <div className="container mt-2">
        <div className="d-flex">
          <h4 className="py-3">Ventas</h4>
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
        <Tabs headers={["Facturas"]} activo={0} onChange={() => { }} />
        <InvoicesTable facturas={facturas} />
      </div>
    );
  }
}

export default VentasComponent;