import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import Buscador from "../otros/Buscador";
import Pagination from "../otros/Pagination";
import ProductForm from "./ProductForm";
import CustomModal from "../otros/CustomModal";

const PAGTAM = 15;

class ProductsTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    search: "",
    currentPage: 1,
    producto: {
      idProd: -1,
      nombreProd: "",
      idcategoriaProd: "",
      stockProd: "",
      precioProd: "",
    },
  };

  ModalHandle = (isNew) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    this.setState({ modalHeader: isNew === 1 ? "Nuevo" : "Modificar" });
    if (!modalIsOpen) {
      this.setState({
        producto: {
          idProd: -1,
          nombreProd: "",
          idcategoriaProd: "",
          stockProd: "",
          precioProd: "",
        },
      });
    }
  };

  pageHandler = (page) => {
    this.setState({ currentPage: this.state.currentPage + page });
  };

  searchHandle = (str) => {
    this.setState({ search: str });
  };

  onEdit = (_id) => {
    this.ModalHandle();
    this.setState({
      producto: this.props.products.find((e) => e.idProd === _id),
    });
  };

  render() {
    const { products, categorias } = this.props;
    const {
      modalIsOpen,
      producto,
      modalHeader,
      search,
      currentPage,
    } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <Buscador onChange={this.searchHandle} />
          <button
            onClick={() => {
              this.ModalHandle(1);
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
              <th>Categoria</th>
              <th>Stock</th>
              <th>Precio</th>
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {products
              .slice((currentPage - 1) * PAGTAM, currentPage * PAGTAM - 1)
              .filter((e) => e.nombreProd.toLowerCase().includes(search))
              .map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.idProd}</td>
                    <td>{e.nombreProd}</td>
                    <td>{e.nombreCat}</td>
                    <td>{e.stockProd}</td>
                    <td>${e.precioProd}</td>
                    <td align="center">
                      <EditBtn
                        onClick={() => {
                          this.onEdit(e.idProd);
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
          title={modalHeader + " producto"}
          isOpen={modalIsOpen}
        >
          <ProductForm categorias={categorias} producto={producto} />{" "}
        </CustomModal>

        <Pagination
          length={products.length}
          currentPage={currentPage}
          pageHandler={this.pageHandler}
        />
        <br />
      </React.Fragment>
    );
  }
}

export default ProductsTable;
