import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";

class CatForm extends Component {
  state = {};
  render() {
    const { categorias } = this.props;
    return (
      <Form>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form>
    );
  }
}

export default CatForm;
