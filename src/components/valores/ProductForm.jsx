import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

class ProductForm extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    console.log("submit")
    /*
    this.props.onSubmit({
      nombreCat: this.nombre.current.value,
      descripcionCat: this.descrip.current.value
    })*/
  };

  render() {
    const { producto, categorias } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" defaultValue={producto.nombreProd} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            defaultValue={
              producto.idProd !== -1
                ? categorias.find((e) => e.idCat === producto.idcategoriaProd)
                    .idCat
                : ""
            }
          >
            {categorias.map((c, i) => {
              return (
                <option key={i} value={c.idCat}>
                  {c.nombreCat}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" defaultValue={producto.stockProd} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="number" defaultValue={producto.precioProd} />
          </InputGroup>
        </Form.Group>
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default ProductForm;
