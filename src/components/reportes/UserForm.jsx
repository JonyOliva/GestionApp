import React, { Component } from "react";
import { Form } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { SesionContext } from "../inicio/SesionComponent";
import * as Users from "../UsersHandler";

class UserForm extends Component {
  static contextType = SesionContext;
  state = {
    nombre: "",
    rol: -1,
    pass: ""
  };

  constructor(props){
    super(props);
    const {usuario} = this.props;
    if(usuario.idUsu !== -1)
    this.state = {
      nombre: usuario.nombreUsu,
      rol: usuario.rolUsu,
      pass: usuario.passwordUsu
    }
    this.validator = new SimpleReactValidator();
  }

  onSubmit = async (event) => {
    const {nombre, rol, pass} = this.state;
    event.preventDefault();
    if(this.validator.allValid()){
      let data = {
        nombreUsu: nombre,
        rolUsu: rol,
        passwordUsu: pass
      }
      if(this.props.usuario.idUsu !== -1){
        await Users.Put(this.context, this.props.usuario.idUsu, {...data, idUsu: this.props.usuario.idUsu});
      }else{
        await Users.Post(this.context, data);
      }
      this.props.onSubmit();
    }else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChange = (event)=>{
    const {name, value} = event.target;
    let valor = (name.includes("rol")) ? parseInt(value) : value;
    this.setState({[name]:valor});
  }
  render() {
    const { roles } = this.props;
    const { nombre, rol, pass } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={nombre} onChange={this.handleChange}/>
          <div className="text-danger">{this.validator.message("name", nombre, 'required|alpha_space')}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            name="rol"
            value={rol}
            onChange={this.handleChange}
          >
            {roles.map((c, i) => {
              return (
                <option key={i} value={c.nivelRol}>
                  {c.nombreRol}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="pass" value={pass} onChange={this.handleChange}/>
          <div className="text-danger">{this.validator.message("password", pass, 'required|min:6|max:10')}</div>
        </Form.Group>
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default UserForm;
