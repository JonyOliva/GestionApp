import React, { Component } from "react";
import { Form } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { SesionContext } from "./SesionComponent";
import { LOGIN_URL } from "../../Constants";

class LoginForm extends Component {
  static contextType = SesionContext;
  state = {
    nombre: "",
    pass: ""
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  onSubmit = async (event) => {
    const { nombre, pass } = this.state;
    event.preventDefault();
    if (this.validator.allValid()) {
      let resp = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({ nombreUsu: nombre, passwordUsu: pass }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          else throw new Error("error");
        })
        .catch((error) => { console.log(error) });
        if(resp){
          if (resp.state === "Logged") {
            this.context.login(nombre, "Bearer " + resp.token);
          }
        }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let valor = (name.includes("rol")) ? parseInt(value) : value;
    this.setState({ [name]: valor });
  }
  render() {
    const { nombre, pass } = this.state;
    return (
      <React.Fragment>
        <h5 className="head-session ">Iniciar sesión</h5>
        <Form onSubmit={this.onSubmit} className="p-2">
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={nombre} onChange={this.handleChange} />
            <div className="text-danger">{this.validator.message("name", nombre, 'required|alpha_space')}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="pass" value={pass} onChange={this.handleChange} />
            <div className="text-danger">{this.validator.message("password", pass, 'required|min:6|max:10')}</div>
          </Form.Group>
          <div className="row justify-content-around">
            <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
