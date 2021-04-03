import React, { Component } from "react";
import {SesionContext} from "./SesionComponent";

class UserInfo extends Component {
  static contextType = SesionContext;
  render() {
  return <div className="navbar-text text-white sesion">{this.context.nombre}<img className="mx-1 mb-1" src="https://icongr.am/material/account-box.svg?size=32&color=ffffff"></img></div>;
  }
}

export default UserInfo;
