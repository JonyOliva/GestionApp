import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import EditBtn from "../otros/EditBtn";
import Buscador from "../otros/Buscador";
import CustomModal from "../otros/CustomModal";
import ClientForm from "./ClientForm"
import { SesionContext } from "../inicio/SesionComponent";
import * as Customers from "../CustomersHandler";

class ClientesTable extends Component {
  static contextType = SesionContext;
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    confModal: false,
    cliente: { undefined },
    clientes: []
  }

  resetClState = () => {
    this.setState({
      cliente: {
        idCli: -1,
        nombre: "",
        apellido: "",
        dni: "",
        nroCel: ""
      }
    });
  };

  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = async () => {
    let c = await Customers.Get(this.context);
    this.setState({ clientes: c });
  };

  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        cliente: this.state.clientes.find((e) => e.idCli === _id),
      });
    } else {
      this.setState({ modalHeader: "Nuevo" });
      this.resetClState();
    }
  };

  SubmitHandler = () => {
    this.getCustomers();
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { modalHeader, modalIsOpen, clientes } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <Buscador onChange={this.searchHandle} />
          <button
            onClick={() => {
              this.ModalHandle(undefined);
            }}
            className="btn btn-primary btn-sm my-2 ml-auto mr-3"
          >
            {" "}
              Nuevo
            </button>
        </div>
        <Table hover bordered striped>
          <thead>
            <tr>
              <th># ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Nro celular</th>
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {clientes ? clientes.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.idCli}</td>
                  <td>{e.nombreCli}</td>
                  <td>{e.apellidoCli}</td>
                  <td>{e.dniCli}</td>
                  <td>{e.nroCelularCli}</td>
                  <td align="center" className="p-0 align-middle">
                    <EditBtn
                      onClick={() => {
                        this.ModalHandle(e.idCli);
                      }}
                    />
                  </td>
                </tr>
              );
            }) : ""}
          </tbody>
        </Table>
        <CustomModal
          hide={() => {
            this.setState({ modalIsOpen: false });
          }}
          title={modalHeader + " cliente"}
          isOpen={modalIsOpen}
        >
          <ClientForm cliente={this.state.cliente} onSubmit={this.SubmitHandler} />
        </CustomModal>
      </React.Fragment>
    );
  }
}

export default ClientesTable;