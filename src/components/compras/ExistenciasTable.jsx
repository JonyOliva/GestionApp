import React, { Component } from 'react';
import CustomModal from "../otros/CustomModal";
import StockForm from "./StockForm";
import { Table, Row } from 'react-bootstrap';

class ExistenciasTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    existencia:{}
  }

  resetProductState = ()=>{
    this.setState({
      existencia: {
        idExist: -1,
      }
    });
  }

  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        producto: this.props.existencias.find((e) => e.idProd === _id),
      });
    } else {
      this.setState({ modalHeader: "Nueva" });
      this.resetProductState();
    }
  };

  render() {
    const {modalIsOpen, modalHeader} = this.state;

    return (
      <React.Fragment>
        <Row>
          <button
            onClick={() => {
              this.ModalHandle(undefined);
            }}
            className="btn btn-primary btn-sm my-2 ml-auto mr-3"
          >
            {" "}
            Nuevo
          </button>
        </Row>

        <Table bordered striped hover>
          <thead>
            <tr>
              <th># ID</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {this.props.existencias.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.idRep}</td>
                  <td>{e.nombreProd + "  #" + e.idproductoRep}</td>
                  <td>{e.cantidadRep}</td>
                  <td>{e.fechaRep}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomModal
          hide={() => {
            this.setState({ modalIsOpen: false });
          }}
          title={modalHeader + " existencia"}
          isOpen={modalIsOpen}
        >
          <StockForm />
        </CustomModal>
      </React.Fragment>
    );
  }
}

export default ExistenciasTable;