import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import CustomModal from "../otros/CustomModal";
import UserForm from "./UserForm";
import ConfirmationModal from "../otros/ConfirmationModal";

class UsuariosTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    search: "",
    confModal: false,
    usuario: {},
  };

  resetUsuState = () => {
    this.setState({
      usuario: {
        idUsu: -1,
        nombreUsu: "",
        rolUsu: 1,
        passwordUsu: "",
      },
    });
  };

  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        usuario: this.props.usuarios.find((e) => e.idUsu === _id),
      });
    } else {
      this.setState({ modalHeader: "Nuevo" });
      this.resetUsuState();
    }
  };

  SubmitHandler = (user) => {
    const { usuario } = this.state;
    if (usuario.idUsu === -1) {
      this.props.postData("POST", user);
    } else {
      this.props.postData(
        "PUT",
        { ...user, idUsu: usuario.idUsu },
        usuario.idUsu
      );
    }
    this.setState({ modalIsOpen: false });
  };

  onDelete = (id) => {
    if (id) {
      this.setState({
        usuario: this.props.usuarios.find((e) => e.idUsu === id),
      });
      this.setState({ confModal: true });
    } else {
      this.props.postData("DELETE", {}, this.state.usuario.idUsu);
      this.resetUsuState();
      this.setState({ confModal: false });
    }
  };

  render() {
    const { modalIsOpen, modalHeader, confModal, usuario } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <button
            onClick={() => {
              this.ModalHandle();
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
              <th>Rol</th>
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.usuarios.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.idUsu}</td>
                  <td>{e.nombreUsu}</td>
                  <td>{e.nombreRol}</td>
                  <td align="center" className="p-0 align-middle">
                    <EditBtn
                      onClick={() => {
                        this.ModalHandle(e.idUsu);
                      }}
                    />
                    <DeleteBtn
                      onClick={() => {
                        this.onDelete(e.idUsu);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomModal
          hide={() => {
            this.setState({ modalIsOpen: false });
          }}
          title={modalHeader + " usuario"}
          isOpen={modalIsOpen}
        >
          <UserForm
            usuario={this.state.usuario}
            roles={this.props.roles}
            onSubmit={this.SubmitHandler}
          />
        </CustomModal>
        <ConfirmationModal
          show={confModal}
          hide={() => {
            this.setState({ confModal: false });
          }}
          item={`#${usuario.idUsu} - ${usuario.nombreUsu} , con el rol asignado de ${usuario.nombreRol}`}
          confirm={()=>{this.onDelete(undefined)}}
        ></ConfirmationModal>
      </React.Fragment>
    );
  }
}

export default UsuariosTable;
