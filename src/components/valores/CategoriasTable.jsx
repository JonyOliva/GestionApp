import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";

class CategoriasTable extends Component {
  state = {};
  render() {
    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th># ID</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th width="12%"></th>
          </tr>
        </thead>
        <tbody>
          {this.props.categorias.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.idCat}</td>
                <td>{e.nombreCat}</td>
                <td>{e.descripcionCat}</td>
                <td align="center">
                  <EditBtn
                  />
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

export default CategoriasTable;
