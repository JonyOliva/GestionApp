import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

class UsuariosTable extends Component {
    state = {  }
    render() { 
        return (
          <Table hover bordered striped>
            <thead>
              <tr>
                <th># ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Contraseña</th>
                <th width="12%"></th>
              </tr>
            </thead>
            <tbody>
              {this.props.usuarios.map( (e, i) => {
                  return (
                    <tr key={i}>
                      <td>{e.idUsu}</td>
                      <td>{e.nombreUsu}</td>
                      <td>{e.nombreRol}</td>
                      <td>{e.passwordUsu}</td>
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
 
export default UsuariosTable;