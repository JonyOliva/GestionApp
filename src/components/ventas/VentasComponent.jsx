import React, { Component } from 'react';
import InvoicesTable from "./InvoicesTable";
import Tabs from "../otros/Tabs";
import {FAC_URL} from '../../Constants';

class VentasComponent extends Component {
    state = { 
      facturas: []
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

    render() { 
      const {facturas} = this.state;
        return (
          <div className="container mt-2">
            <h4>Ventas</h4>
            <Tabs headers={["Facturas"]} activo={0} onChange={() => {}} />
            <InvoicesTable facturas={facturas} />
          </div>
        );
    }
}
 
export default VentasComponent;