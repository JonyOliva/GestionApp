import React, { Component } from "react";
import { Form, Alert, Spinner } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { SesionContext } from "./SesionComponent";
import { LOGIN_URL } from "../../Constants";

class LoginForm extends Component {
  static contextType = SesionContext;
  state = {
    nombre: "",
    pass: "",
    disabledSubmit: false,
    alert: {visible: false, msg: ""},
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  onSubmit = async (event) => {
    this.setState({alert:{visible:false}})
    const { nombre, pass } = this.state;
    event.preventDefault();
    if (this.validator.allValid()) {
      this.setState({disabledSubmit: true})
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
        .catch((error) => {
          console.log(error)
          if(error instanceof TypeError){
            this.setState({alert:{visible:true, msg: "Servicio no disponible"}})
          }else{
            this.setState({alert:{visible:true, msg: "Usuario o contraseña inválidos"}})
          }
          this.setState({disabledSubmit: false})
          this.setState({ nombre: "" });
          this.setState({ pass: "" });
        });
      if (resp) {
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
    this.setState({ [name]: value });
  }
  render() {
    const { nombre, pass, alert, disabledSubmit } = this.state;
    return (
      <React.Fragment>
        <h5 className="head-session mb-0">Iniciar sesión</h5>
        <Alert
          className="mt-2 mb-0 mx-2 p-2 text-center"
          variant={"danger"}
          show={alert.visible}
        >
          {"Error: "} {"  "}
          {alert.msg}
        </Alert>
        <Form onSubmit={this.onSubmit} className="p-2">
          <Form.Group>
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" name="nombre" value={nombre} onChange={this.handleChange} />
            <div className="text-danger">{this.validator.message("name", nombre, 'required|alpha_space')}</div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="pass" value={pass} onChange={this.handleChange} />
            <div className="text-danger">{this.validator.message("password", pass, 'required|min:6|max:10')}</div>
          </Form.Group>
          <div className="row justify-content-around">
            {(disabledSubmit) ? <Spinner animation="border" /> : 
            <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>}
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
