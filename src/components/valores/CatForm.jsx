import React, { Component } from "react";
import { Form } from "react-bootstrap";

class CatForm extends Component {
  state = {};

  constructor(){
    super();
    this.nombre = React.createRef();
    this.descrip = React.createRef();
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      nombreCat: this.nombre.current.value,
      descripcionCat: this.descrip.current.value
    })
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control ref={this.nombre} type="text" defaultValue={this.props.cat.nombreCat} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            ref={this.descrip}
            type="text"
            defaultValue={this.props.cat.descripcionCat}
          />
        </Form.Group>
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default CatForm;
