import React, { Component } from "react";
import "./InicioComponent.css";
import { SesionContext } from "./SesionComponent";
import LoginForm from "./LoginForm";
import { Row, Col, Container } from "react-bootstrap";

class InicioComponent extends Component {
  static contextType = SesionContext;
  state = {};

  showCurrentSession = () => {
    let component = (this.context.sesion) ?
      <div className="text-session px-4 py-2"> Usted ha iniciado sesión como {this.context.nombre}</div> :
      <LoginForm />
    return component;
  }

  render() {
    return (
      <Container className="mt-2">
        <h4 className="py-3">Inicio</h4>
        <Row className="justify-content-around">
          <Col xs={5}>
          <div className="border-home shadow">
              {this.showCurrentSession()}
            </div>
          </Col>
          <Col>
          asd
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InicioComponent;
