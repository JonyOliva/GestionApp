import React, { Component } from "react";
import ClientesTable from "./ClientesTable";
import UsuariosTable from "./UsuariosTable";
import Tabs from "../otros/Tabs";

class ReportesComponent extends Component {
  state = {
    clientes: [],
    usuarios: [],
    tablas: ["Clientes", "Usuarios"],
    activo: 0,
  };

  async componentDidMount() {
    let customers = await fetch("http://localhost:9090/api/Clientes")
    .then((response)=>{
      return response.json();
    });
    if (customers) {
      this.setState({ clientes: customers });
    }

    let roles = await fetch("http://localhost:9090/api/Roles")
    .then((response)=>{
      return response.json();
    })
    
    let users = await fetch("http://localhost:9090/api/Usuarios")
    .then((response)=>{
      return response.json();
    })

    if(roles && users){
      this.setState({
        usuarios: users.map((e) => {
          let rol = roles.find(
            (element) => element.nivelRol === e.rolUsu
          );
          return { ...e, nombreRol: rol.nombreRol };
        }),
      });
    }
  }

  getCurrentTable = () => {
    if (this.state.activo === 0) {
      return <ClientesTable clientes={this.state.clientes} />;
    } else if (this.state.activo === 1) {
      return <UsuariosTable usuarios={this.state.usuarios} />;
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  render() {
    const { tablas, activo } = this.state;
    return (
      <div className="container mt-2">
        <h4>Reportes</h4>
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
