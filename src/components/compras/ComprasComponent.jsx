import React, { Component } from 'react';
import Tabs from "../otros/Tabs";
import ExistenciasTable from "./ExistenciasTable";
import {PROD_URL, RSTOCK_URL} from "../../Constants";

class ComprasComponent extends Component {
  state = { existencias: [] };

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
    return (
      <div className="container mt-2">
        <h4>Compras</h4>
        <Tabs headers={["Existencias"]} activo={0} onChange={() => {}} />
        <ExistenciasTable existencias={this.state.existencias} />
      </div>
    );
  }
}
 
export default ComprasComponent;