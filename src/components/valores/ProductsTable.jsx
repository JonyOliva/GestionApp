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

  resetProductState = ()=>{
    this.setState({
      producto: {
        idProd: -1,
        nombreProd: "",
        idcategoriaProd: "",
        stockProd: "",
        precioProd: "",
      }
    });
  }
  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        producto: this.props.products.find((e) => e.idProd === _id),
      });
    } else {
      this.setState({ modalHeader: "Nuevo" });
      this.resetProductState();
    }
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

  pageHandler = (page) => {
    this.setState({ currentPage: this.state.currentPage + page });
  };

  searchHandle = (str) => {
    this.setState({ search: str });
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
              this.ModalHandle(undefined);
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
                          this.ModalHandle(e.idProd);
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
          <ProductForm categorias={categorias} producto={producto} onSubmit={this.SubmitHandler}/>
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
