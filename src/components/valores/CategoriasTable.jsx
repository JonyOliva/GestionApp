import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import CustomModal from "../otros/CustomModal";
import ConfirmationModal from "../otros/ConfirmationModal";
import CatForm from "./CatForm";

class CategoriasTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    confModal: false,
    categoria: {}
  };

  resetCatState = () => {
    this.setState({
      categoria: {
        idCat: -1,
        nombreCat: "",
        descripcionCat: "",
      },
    });
  };

  SubmitHandler = (Cat) => {
    const { categoria } = this.state;
    if (categoria.idCat === -1) {
      this.props.postData("POST", Cat);
    } else {
      this.props.postData(
        "PUT",
        { ...Cat, idCat: categoria.idCat },
        categoria.idCat
      );
    }
    this.setState({ modalIsOpen: false });
  };

  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        categoria: this.props.categorias.find((e) => e.idCat === _id),
      });
    } else {
      this.setState({ modalHeader: "Nuevo" });
      this.resetCatState();
    }
  };

  onDelete = (id) => {
    if(id){
      this.setState({
        categoria: this.props.categorias.find((e) => e.idCat === id)
      });
      this.setState({ confModal: true });
    }else{
      this.props.postData("DELETE", {}, this.state.categoria.idCat);
      this.resetCatState();
      this.setState({ confModal: false });
    }
  };

  render() {
    console.log(this.context)
    const {confModal, categoria, modalHeader, modalIsOpen} = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <button
            onClick={() => {
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
                  <td align="center" className="p-0 align-middle">
                    <EditBtn
                      onClick={() => {
                        this.ModalHandle(e.idCat);
                      }}
                    />
                    <DeleteBtn
                      onClick={() => {
                        this.onDelete(e.idCat);
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
          title={modalHeader + " categoria"}
          isOpen={modalIsOpen}
        >
          <CatForm cat={categoria} onSubmit={this.SubmitHandler} />
        </CustomModal>
        <ConfirmationModal
          show={confModal}
          hide={() => {
            this.setState({ confModal: false });
          }}
          item={"#" + categoria.idCat + " - " + categoria.nombreCat}
          confirm={()=>{this.onDelete(undefined)}}
        ></ConfirmationModal>
      </React.Fragment>
    );
  }
}

export default CategoriasTable;
