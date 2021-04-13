import React, { Component } from "react";
import { SesionContext } from "../inicio/SesionComponent";
import * as Categories from "../CategoriesHandler";
import { Form } from "react-bootstrap";

class CatForm extends Component {
  static contextType = SesionContext;
  constructor(){
    super();
    this.nombre = React.createRef();
    this.descrip = React.createRef();
  }

  onSubmit = async (event) => {
    event.preventDefault();
    let newCat = {
      nombreCat: this.nombre.current.value,
      descripcionCat: this.descrip.current.value
    }
    if(this.props.cat.idCat !== -1){
      await Categories.Put(this.context, this.props.cat.idCat, {...newCat, idCat: this.props.cat.idCat});
    }else{
      await Categories.Post(this.context, newCat);
    }
    this.props.onSubmit();
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
