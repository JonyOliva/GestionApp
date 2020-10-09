import React, { Component } from "react";
import ClientesTable from "./ClientesTable";
import UsuariosTable from "./UsuariosTable";
import {SesionContext} from "../inicio/SesionComponent";
import Tabs from "../otros/Tabs";
import { Alert } from "react-bootstrap";
import {USU_URL, ROL_URL, CLI_URL} from "../../Constants";
import {FetchData} from "../DataFunc";

class ReportesComponent extends Component {
  static contextType = SesionContext;
  state = {
    clientes: [],
    usuarios: [],
    roles: [],
    tablas: ["Clientes", "Usuarios"],
    activo: 0,
    alert: {
      enable: false,
      style: "",
      head: "",
      msg: "",
      timerId: undefined,
    },
  };

  getCustomers = async () => {
    await fetch(CLI_URL, {method: "GET", headers: this.context.headers})
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ clientes: json });
      })
      .catch((error) => {
        throw error;
      });
  };

  getRoles = async () => {
    return await fetch(ROL_URL, {method: "GET", headers: this.context.headers})
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ roles: json });
      })
      .catch((error) => {
        throw error;
      });
  };

  getUsers = async () => {
    await fetch(USU_URL, {method: "GET", headers: this.context.headers})
      .then((response) => {
        if(response.status === 401)  
        throw new Error("No posee los privilegios para realizar esta acción");
        return response.json();
      })
      .then((users) => {
        this.setState({
          usuarios: users.map((e) => {
            let rol = this.state.roles.find(
              (element) => element.nivelRol === e.rolUsu
            );
            return { ...e, nombreRol: rol.nombreRol };
          }),
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  async componentDidMount() {
    try {
      await this.getCustomers();
      await this.getRoles();
      await this.getUsers();
    } catch (error) {
      this.setAlert(
        "Error: ",
        "danger",
        error.message
      );
    }
  }

  UsuariosHandler = async (method, prod, id) => {
    let url = (id!==undefined) ? USU_URL + "/" + id : USU_URL
    await FetchData(url, method, this.context.headers(), prod, this.setAlert);
    await this.getUsers();
  };

  ClientesHandler = async (method, cl, id) => {
    let url = (id!==undefined) ? CLI_URL + "/" + id : CLI_URL
    await FetchData(url, method, this.context.headers(), cl, this.setAlert);
    await this.getCustomers();
  };

  setAlert = (head, style, msg, timeOut) => {
    const { timerId } = this.state.alert;
    if (timerId !== undefined) clearTimeout(timerId);
    let timer = timeOut ? setTimeout(this.AlertClose, 3000) : undefined;
    this.setState({
      alert: {
        enable: true,
        head: head,
        style: style,
        msg: msg,
        timerId: timer,
      },
    });
  };
  AlertClose = () => {
    const { alert } = this.state;
    this.setState({ alert: { ...alert, enable: false } });
  };
  getCurrentTable = () => {
    const { clientes, usuarios, roles, activo } = this.state;
    if (activo === 0) {
      return <ClientesTable clientes={clientes} postData={this.ClientesHandler} />;
    } else if (activo === 1) {
      return <UsuariosTable usuarios={usuarios} roles={roles} postData={this.UsuariosHandler}/>;
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  render() {
    const { tablas, activo, alert } = this.state;
    return (
      <div className="container mt-2">
        <h4>Reportes</h4>
          <Tabs
            headers={tablas}
            activo={activo}
            onChange={this.ChangeActiveTab}
          />
          <div className="w-50 m-auto">
            <Alert
              className="mb-0"
              variant={alert.style}
              show={alert.enable}
              onClose={this.AlertClose}
              dismissible
            >
              {alert.head} {"  "}
              {alert.msg}
            </Alert>
          </div>
        {this.getCurrentTable()}
      </div>
    );
  }
}

export default ReportesComponent;
