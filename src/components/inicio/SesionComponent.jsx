import React, { Component } from "react";
import "../otros/Navbar.css";

export const SesionContext = React.createContext("Invitado");

class SesionComponent extends Component {
  state = {
      sesion: false,
      nombre: "Invitado",
      token: "",
      alert: {
        enable: false,
        head: "",
        style: "",
        msg: "",
        timerId: 0
      }
  };

  setAlert = (head, style, msg, timeOut) => {
    const { alert } = this.state;
    if (alert.timerId !== undefined)
      clearTimeout(alert.timerId);
    let timer = (timeOut) ? setTimeout(()=>{
      this.setState({alert:{enable: false}})
    }, 3000) : undefined;
    this.setState({
      alert: {
        enable: true,
        head: head,
        style: style,
        msg: msg,
        timerId: timer
      }
    });
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
    return <SesionContext.Provider value={{...this.state, setAlert: this.setAlert, login: this.login, headers: this.getHeaders}}>
        {this.props.children}
    </SesionContext.Provider>;
  }
}

export default SesionComponent;
