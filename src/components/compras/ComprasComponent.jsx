import React, { Component } from 'react';
import Tabs from "../otros/Tabs";
import ExistenciasTable from "./ExistenciasTable";
import {PROD_URL, RSTOCK_URL} from "../../Constants";
import { Alert } from "react-bootstrap";

class ComprasComponent extends Component {
  state = { 
    existencias: [] ,
    alert: {
      enable: false,
      style: "",
      head: "",
      msg: "",
      timerId: undefined
    },
  };

  async componentDidMount() {
    let res = await fetch(PROD_URL);
    if (res.ok) {
      let pjson = await res.json();
      this.setState({ products: pjson });
    }

    res = await fetch(RSTOCK_URL);
    if (res.ok) {
      let json = await res.json();
      this.setState({
        existencias: json.map((e) => {
          let prod = this.state.products.find(
            (i) => i.idProd === e.idproductoRep
          );
          return { ...e, nombreProd: prod.nombreProd };
        }),
      });
    }
  }

  render() {
    const { alert  } = this.state;
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
        <ExistenciasTable existencias={this.state.existencias} />
      </div>
    );
  }
}
 
export default ComprasComponent;