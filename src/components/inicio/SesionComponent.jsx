import React, { Component } from "react";
import "../otros/Navbar.css";

export const SesionContext = React.createContext("Invitado");

class SesionComponent extends Component {
  state = {
      sesion: false,
      nombre: "Invitado",
      token: ""
  };

  login = (nombre, token) => {
    this.setState({sesion: true, nombre: nombre, token: token});
  }

  getHeaders = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(this.state.sesion)
    headers.append('Authorization', this.state.token);
    return headers;
  }

  render() {
    return <SesionContext.Provider value={{...this.state, login: this.login, headers: this.getHeaders}}>
        {this.props.children}
    </SesionContext.Provider>;
  }
}

export default SesionComponent;
