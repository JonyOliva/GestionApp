import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import CustomModal from "../otros/CustomModal";
import CatForm from "./CatForm";

class CategoriasTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    categoria: {
      id: -1,
      nombre: "",
      descrip: "",
    },
  };

  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        categoria: this.props.categorias.find((e) => e.idCat === _id)
      });
    } else {
      this.setState({ modalHeader: "Nuevo" });
      this.setState({
        categoria: {
          id: -1,
          nombre: "",
          descrip: "",
        },
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <button
            onClick={()=>{
              this.ModalHandle();
            }}
            className="btn btn-primary btn-sm mb-2 mt-2 ml-auto mr-4"
          >
            {" "}
            Nuevo
          </button>
        </div>
        <Table bordered striped hover>
          <thead>
            <tr>
              <th># ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.categorias.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.idCat}</td>
                  <td>{e.nombreCat}</td>
                  <td>{e.descripcionCat}</td>
                  <td align="center">
                    <EditBtn
                      onClick={() => {
                        this.ModalHandle(e.idCat);
                      }}
                    />
                    <DeleteBtn />
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
          title={this.state.modalHeader + " categoria"}
          isOpen={this.state.modalIsOpen}
        >
          <CatForm cat={this.state.categoria} />
        </CustomModal>
      </React.Fragment>
    );
  }
}

export default CategoriasTable;
