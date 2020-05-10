import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";

class ClientesTable extends Component {
    state = {  }
    render() { 
        return (
          <Table hover bordered striped>
            <thead>
              <tr>
                <th># ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Nro celular</th>
                <th width="12%"></th>
              </tr>
            </thead>
            <tbody>
              {this.props.clientes.map( (e, i) => {
                  return (
                    <tr key={i}>
                      <td>{e.idCli}</td>
                      <td>{e.nombreCli}</td>
                      <td>{e.apellidoCli}</td>
                      <td>{e.dniCli}</td>
                      <td>{e.nroCelularCli}</td>
                      <td align="center">
                        <EditBtn />
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
 
export default ClientesTable;