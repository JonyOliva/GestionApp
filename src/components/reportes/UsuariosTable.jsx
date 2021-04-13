import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import CustomModal from "../otros/CustomModal";
import UserForm from "./UserForm";
import ConfirmationModal from "../otros/ConfirmationModal";
import { SesionContext } from "../inicio/SesionComponent";
import * as Users from "../UsersHandler";

class UsuariosTable extends Component {
  static contextType = SesionContext;
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    search: "",
    confModal: false,
    usuario: {},
    usuarios: []
  };

  componentDidMount() {
    this.getUsers();
  }

  resetUsuState = () => {
    this.setState({
      usuario: {
        idUsu: -1
      },
    });
  };

  getUsers = async () => {
    let users = await Users.Get(this.context);
    if (users)
      this.setState({
        usuarios: users.map((e) => {
          let rol = this.props.roles.find(
            (element) => element.nivelRol === e.rolUsu
          );
          return { ...e, nombreRol: rol.nombreRol };
        }),
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

  SubmitHandler = () => {
    this.getUsers();
    this.setState({ modalIsOpen: false });
  };

  onDelete = async (id) => {
    if (id) {
      this.setState({
        usuario: this.state.usuarios.find((e) => e.idUsu === id),
      });
      this.setState({ confModal: true });
    } else {
      await Users.Delete(this.context, this.state.usuario.idUsu);
      this.getUsers();
      this.resetUsuState();
      this.setState({ confModal: false });
    }
  };

  render() {
    const { modalIsOpen, modalHeader, confModal, usuario, usuarios } = this.state;
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
            {usuarios.map((e, i) => {
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
          confirm={() => { this.onDelete(undefined) }}
        ></ConfirmationModal>
      </React.Fragment>
    );
  }
}

export default UsuariosTable;
