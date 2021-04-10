import React, { Component } from 'react';
import { SesionContext } from "../inicio/SesionComponent";
import { PROD_URL } from "../../Constants";
import * as Stocks from "../StocksHandler";
import CustomModal from "../otros/CustomModal";
import StockForm from "./StockForm";
import DeleteBtn from "../otros/DeleteBtn";
import ConfirmationModal from "../otros/ConfirmationModal";
import { Table, Row } from 'react-bootstrap';

class ExistenciasTable extends Component {
  static contextType = SesionContext;

  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    confModal: false,
    existencia: {},
    existencias: []
  }

  resetItemState = () => {
    this.setState({
      existencia: {
        idExist: -1,
      }
    });
  }

  async componentDidMount() {
    let res = await fetch(PROD_URL);
    if (res.ok) {
      let pjson = await res.json();
      this.setState({ products: pjson });
    }
    this.UpdateStocks();
  }

  UpdateStocks = async () => {
    let json = await Stocks.GetStock(this.context);
    this.setState({
      existencias: json.map((e) => {
        let prod = this.state.products.find(
          (i) => i.idProd === e.idproductoRep
        );
        return { ...e, fechaRep: e.fechaRep.substr(0, 10), nombreProd: prod.nombreProd };
      }),
    });

  }

  ModalHandle = (_id) => {
    const { existencias, modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        producto: existencias.find((e) => e.idProd === _id),
      });
    } else {
      this.setState({ modalHeader: "Nueva" });
      this.resetItemState();
    }
  };

  onDelete = async (id) => {
    if (id) {
      this.setState({
        existencia: this.state.existencias.find((e) => e.idRep === id)
      });
      this.setState({ confModal: true });
    } else {
      Stocks.DeleteStock(this.context, this.state.existencia.idRep).then(() => {
        this.resetItemState();
        this.setState({ confModal: false });
        this.UpdateStocks();
      })
    }
  };

  SubmitHandler = () => {
    this.setState({ modalIsOpen: false });
    this.UpdateStocks();
  }

  render() {
    const { existencias, existencia, modalIsOpen, modalHeader, confModal } = this.state;
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
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {existencias.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.idRep}</td>
                  <td><b>IDProd# {e.idproductoRep}</b>{"   -   " + e.nombreProd}</td>
                  <td>{e.cantidadRep}</td>
                  <td>{e.fechaRep}</td>
                  <td align="center" className="p-0 align-middle">
                    <DeleteBtn
                      onClick={() => {
                        this.onDelete(e.idRep);
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
          title={modalHeader + " existencia"}
          isOpen={modalIsOpen}
        >
          <StockForm onSubmit={this.SubmitHandler} />
        </CustomModal>
        <ConfirmationModal
          show={confModal}
          hide={() => {
            this.setState({ confModal: false });
          }}
          item={"#" + existencia.idRep + " - " + existencia.nombreProd}
          confirm={() => { this.onDelete(undefined) }}
        ></ConfirmationModal>
      </React.Fragment>
    );
  }
}

export default ExistenciasTable;