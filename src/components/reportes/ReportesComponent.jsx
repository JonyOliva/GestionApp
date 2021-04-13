import React, { Component } from "react";
import ClientesTable from "./ClientesTable";
import UsuariosTable from "./UsuariosTable";
import { SesionContext } from "../inicio/SesionComponent";
import Tabs from "../otros/Tabs";
import { Alert } from "react-bootstrap";
import * as Roles from "../RolesHandler";

class ReportesComponent extends Component {
  static contextType = SesionContext;
  state = {
    roles: [],
    tablas: ["Clientes", "Usuarios"],
    activo: 0
  };

  getRoles = async () => {
    let r = await Roles.Get(this.context);
    this.setState({roles: r});
  };

  async componentDidMount() {
    try {
      await this.getRoles();
    } catch (error) {
      this.context.alert.set(
        "Error: ",
        "danger",
        error.message
      );
    }
  }

  getCurrentTable = () => {
    const { clientes, usuarios, roles, activo } = this.state;
    if (activo === 0) {
      return <ClientesTable postData={this.ClientesHandler} />;
    } else if (activo === 1) {
      return <UsuariosTable roles={roles} postData={this.UsuariosHandler} />;
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  render() {
    const { tablas, activo } = this.state;
    let alert = this.context.alert.get();
    return (
      <div className="container mt-2">
        <div className="d-flex">
          <h4 className="py-3">Reportes</h4>
          <Alert
            className="ml-auto"
            variant={alert.style}
            show={alert.enable}
            onClose={this.context.alert.close}
            dismissible
          >
            {alert.head} {"  "}
            {alert.msg}
          </Alert>
        </div>
        <Tabs
          headers={tablas}
          activo={activo}
          onChange={this.ChangeActiveTab}
        />

        {this.getCurrentTable()}
      </div>
    );
  }
}

export default ReportesComponent;
