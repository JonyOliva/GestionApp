import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";

class ProductsTable extends Component {
  state = {};
  render() {
    const {products, search} = this.props;
    console.log(search)
    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th># ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Precio</th>
            <th width="12%"></th>
          </tr>
        </thead>
        <tbody>
          {products.filter(e => e.nombreProd.includes(search) ).map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.idProd}</td>
                <td>{e.nombreProd}</td>
                <td>{e.nombreCat}</td>
                <td>{e.stockProd}</td>
                <td>${e.precioProd}</td>
                <td align="center">
                  <EditBtn onClick={() => {this.props.onEdit(e.idProd)}} />
                  <DeleteBtn />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default ProductsTable;
