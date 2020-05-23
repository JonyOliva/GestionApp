import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import Buscador from "../otros/Buscador";

class ClientesTable extends Component {
    state = {  }
    render() { 
        return (
          <React.Fragment>
          <div className="row">
            <Buscador onChange={this.searchHandle} />
            <button
              onClick={() => {
                this.ModalHandle(undefined);
              }}
              className="btn btn-primary btn-sm mb-2 mt-2 ml-auto mr-4"
            >
              {" "}
              Nuevo
            </button>
          </div>
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
          </React.Fragment>
        );
    }
}
 
export default ClientesTable;