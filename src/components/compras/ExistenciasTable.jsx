import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class ExistenciasTable extends Component {
    state = {  }
    render() { 
        return (
          <Table bordered striped hover>
            <thead>
              <tr>
                <th># ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
                {this.props.existencias.map( (e, i)=> {
                  return (
                    <tr key={i}>
                      <td>{e.idRep}</td>
                      <td>{e.nombreProd + "  #" + e.idproductoRep}</td>
                      <td>{e.cantidadRep}</td>
                      <td>{e.fechaRep}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        );
    }
}
 
export default ExistenciasTable;