import React, { Component } from 'react';
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

const prods = [
    {
        id: "1",
        nombre: "amd fx 8350",
        precio: 4100,
        stock: 10
    },
    {
        id: "2",
        nombre: "memoria ram 2100mhz",
        precio: 2100,
        stock: 7
    },
    {
        id: "3",
        nombre: "phantom case",
        precio: 4000,
        stock: 3
    }
]

class ProductsTable extends Component {
    state = {  }
    render() { 
        return (
          <div className="container">
              <table className="table">
            <thead>
            <tr>
              <th># ID</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
                {prods.map((e) => {
                    return (
                      <tr>
                        <td>{e.id}</td>
                        <td>{e.nombre}</td>
                        <td>{e.stock}</td>
                        <td>{e.precio}</td>
                        <td><EditBtn /><DeleteBtn /></td>
                      </tr>
                    );
                })}
            </tbody>
          </table>
          </div>
        );
    }
}
 
export default ProductsTable;