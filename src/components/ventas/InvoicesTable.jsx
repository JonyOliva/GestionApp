import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";

const facs = [
  {
    idf: "0011",
    idc: "001",
    fecha: "10/05/2020",
    desc: 10,
    total: 1000,
  },
  {
    idf: "002",
    idc: "001",
    fecha: "10/08/2019",
    desc: 0,
    total: 2000,
  },
  {
    idf: "003",
    idc: "002",
    fecha: "27/05/2019",
    desc: 10,
    total: 1640,
  },
];

class InvoicesTable extends Component {
    state = {  }
    render() { 
        return (
          <Table bordered striped hover>
            <thead>
              <tr>
                <th># ID Factura</th>
                <th># ID Cliente</th>
                <th>Fecha</th>
                <th>Descuento</th>
                <th>Total</th>
                <th width="12%"></th>
              </tr>
            </thead>
            <tbody>
              {facs.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.idf}</td>
                    <td>{e.idc}</td>
                    <td>{e.fecha}</td>
                    <td>{e.desc > 0 ? e.desc + "%" : "-"}</td>
                    <td>${e.total}</td>
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
 
export default InvoicesTable;