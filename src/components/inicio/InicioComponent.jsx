import React, { Component } from "react";
import "./InicioComponent.css";
import {SesionContext} from "./SesionComponent";
import LoginForm from "./LoginForm";

class InicioComponent extends Component {
  static contextType = SesionContext;
  state = {};

  FetchData = async (url, method, data) => {
    return await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("error");
      })
      .catch((error) => this.setAlert("Error", "danger", "", true));
  };

  showCurrentSession = () => {
    let component = (this.context.sesion) ? 
    <p className="text-session"> Usted ha iniciado sesión como {this.context.nombre}</p> :
    <LoginForm postData={this.FetchData} />
    return component;
  }

  render() {
    return (
      <div className="container mt-2">
        <h4>Inicio</h4>
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
