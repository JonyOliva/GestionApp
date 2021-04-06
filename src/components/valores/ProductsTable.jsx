import React, { Component } from "react";
import { Table } from "react-bootstrap";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import Buscador from "../otros/Buscador";
import Pagination from "../otros/Pagination";
import ProductForm from "./ProductForm";
import CustomModal from "../otros/CustomModal";
import ConfirmationModal from "../otros/ConfirmationModal";

const PAGTAM = 15;

class ProductsTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    search: "",
    confModal: false,
    currentPage: 1,
    producto: {},
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

  onDelete = (id) => {
    if(id){
      this.setState({
        producto: this.props.products.find((e) => e.idProd === id)
      });
      this.setState({ confModal: true });
    }else{
      this.props.postData("DELETE", {}, this.state.producto.idProd);
      this.resetProductState();
      this.setState({ confModal: false });
      this.setState({ currentPage: 1 });
    }
  };

  SubmitHandler = (prod) => {
    const { producto } = this.state;
    if (producto.idProd === -1) {
      this.props.postData("POST", prod);
    } else {
      this.props.postData(
        "PUT",
        { ...prod, idProd: producto.idProd },
        producto.idProd
      );
    }
    this.setState({ modalIsOpen: false });
  };

  pageHandler = (page) => {
    this.setState({ currentPage: this.state.currentPage + page });
  };

  searchHandle = (str) => {
    this.setState({ search: str });
    this.setState({ currentPage: 1 });
  };

  render() {
    const { products, categorias } = this.props;
    const {
      modalIsOpen,
      producto,
      modalHeader,
      search,
      currentPage,
      confModal
    } = this.state;
    let productos = products.filter((e) => e.nombreProd.toLowerCase().includes(search));
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
            {productos
              .slice((currentPage - 1) * PAGTAM, currentPage * PAGTAM)
              .map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.idProd}</td>
                    <td>{e.nombreProd}</td>
                    <td>{e.nombreCat}</td>
                    <td>{e.stockProd}</td>
                    <td>${e.precioProd}</td>
                    <td align="center" className="p-0 align-middle">
                      <EditBtn
                        onClick={() => {
                          this.ModalHandle(e.idProd);
                        }}
                      />
                      <DeleteBtn 
                        onClick={() => {
                          this.onDelete(e.idProd);
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
          title={modalHeader + " producto"}
          isOpen={modalIsOpen}
        >
          <ProductForm categorias={categorias} producto={producto} onSubmit={this.SubmitHandler}/>
        </CustomModal>

        <Pagination
          pagsize={PAGTAM}
          length={productos.length}
          currentPage={currentPage}
          pageHandler={this.pageHandler}
        />
        <br />
        <ConfirmationModal
          show={confModal}
          hide={() => {
            this.setState({ confModal: false });
          }}
          item={"#" + producto.idProd + " - " + producto.nombreProd}
          confirm={()=>{this.onDelete(undefined)}}
        ></ConfirmationModal>
      </React.Fragment>
    );
  }
}

export default ProductsTable;
