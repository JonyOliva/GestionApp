import React, { Component } from 'react';
import InvoicesTable from "./InvoicesTable";
import Tabs from "./Tabs";

class VentasComponent extends Component {
    state = {  }
    render() { 
        return (
          <div className="container mt-2">
            <h4>Ventas</h4>
            <Tabs headers={["Facturas"]} activo={0} onChange={() => {}} />
            <InvoicesTable />
          </div>
        );
    }
}
 
export default VentasComponent;