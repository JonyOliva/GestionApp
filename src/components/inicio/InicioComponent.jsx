import React, { Component } from "react";
import "./InicioComponent.css";
import {SesionContext} from "./SesionComponent";
import LoginForm from "./LoginForm";

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
      <div className="container mt-2">
        <h4 className="py-3">Inicio</h4>
        <div className="row row-cols-3 justify-content-around">
          <div className="col-5">
            <div className="border-home">
              {this.showCurrentSession()}
            </div>
          </div>
          <div className="col-5">asd</div>
          <div className="col-11">asd</div>
        </div>
      </div>
    );
  }
}

export default InicioComponent;
