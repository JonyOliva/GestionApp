import React, { Component } from "react";
import { Form } from "react-bootstrap";

class CatForm extends Component {
  state = {};
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" defaultValue={this.props.cat.nombreCat}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" defaultValue={this.props.cat.descripcionCat}/>
        </Form.Group>
      </Form>
    );
  }
}

export default CatForm;
