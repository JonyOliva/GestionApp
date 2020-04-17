import React, { Component } from 'react';
import Tabs from "./Tabs";
import ExistenciasTable from "./ExistenciasTable";

class ComprasComponent extends Component {
  state = { existencias: [] };

  async componentDidMount() {
    let res = await fetch("http://localhost:9090/api/Productos");
    if (res.ok) {
      let pjson = await res.json();
      this.setState({ products: pjson });
    }

    res = await fetch("http://localhost:9090/api/ReposicionesStocks");
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