import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

class ProductForm extends Component {
  state = {};
  render() {
    const { product, categorias } = this.props;
    return (
      <Form>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" defaultValue={product.nombreProd} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            defaultValue={
              product.idProd !== -1
                ? categorias.find((e) => e.idCat === product.idcategoriaProd)
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
          <Form.Control type="number" defaultValue={product.stockProd} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="number" defaultValue={product.precioProd} />
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}

export default ProductForm;
