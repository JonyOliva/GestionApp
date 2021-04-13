import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { SesionContext } from "../inicio/SesionComponent";
import * as Products from "../ProductsHandler";
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import Buscador from "../otros/Buscador";
import Pagination from "../otros/Pagination";
import ProductForm from "./ProductForm";
import CustomModal from "../otros/CustomModal";
import ConfirmationModal from "../otros/ConfirmationModal";

const PAGTAM = 15;

class ProductsTable extends Component {
  static contextType = SesionContext;
  state = {
    modalIsOpen: false,
    modalHeader: "Nuevo",
    search: "",
    confModal: false,
    currentPage: 1,
    producto: {},
    productos: []
  };

  getProductos = async () =>{
    let prods = await Products.Get(this.context);
    if(prods)
    this.setState({
      productos: prods.map((e)=>{
        let cat = this.props.categorias.find(ec => e.idcategoriaProd === ec.idCat) || {nombreCat: "-"};
        return {...e, nombreCat: cat.nombreCat}
      })
    });
  }

  componentDidMount() {
    this.getProductos();
  }

  resetProductState = () => {
    this.setState({
      producto: {
        idProd: -1
      }
    });
  }
  ModalHandle = (_id) => {
    const { modalIsOpen, productos } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        producto: productos.find((e) => e.idProd === _id),
      });
    } else {
      this.setState({ modalHeader: "Nuevo" });
      this.resetProductState();
    }
  };

  onDelete = async (id) => {
    if (id) {
      this.setState({
        producto: this.state.productos.find((e) => e.idProd === id)
      });
      this.setState({ confModal: true });
    } else {
      await Products.Delete(this.context, this.state.producto.idProd);
      this.getProductos();
      this.resetProductState();
      this.setState({ confModal: false });
      this.setState({ currentPage: 1 });
    }
  };

  SubmitHandler = () => {
    this.setState({ modalIsOpen: false });
    this.getProductos();
  };

  pageHandler = (page) => {
    this.setState({ currentPage: this.state.currentPage + page });
  };

  searchHandle = (str) => {
    this.setState({ search: str });
    this.setState({ currentPage: 1 });
  };

  render() {
    const { categorias } = this.props;
    const {
      modalIsOpen,
      producto,
      productos,
      modalHeader,
      search,
      currentPage,
      confModal
    } = this.state;
    let actProds = productos.filter((e) => e.nombreProd.toLowerCase().includes(search));
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
              <th className="text-center">Categoria</th>
              <th className="text-center">Stock</th>
              <th className="text-center">Precio</th>
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {actProds
              .slice((currentPage - 1) * PAGTAM, currentPage * PAGTAM)
              .map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.idProd}</td>
                    <td>{e.nombreProd}</td>
                    <td align="center">{e.nombreCat}</td>
                    <td align="center">{e.stockProd}</td>
                    <td align="center">${e.precioProd}</td>
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
          <ProductForm categorias={categorias} producto={producto} onSubmit={this.SubmitHandler} />
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
          confirm={() => { this.onDelete(undefined) }}
        ></ConfirmationModal>
      </React.Fragment>
    );
  }
}

export default ProductsTable;
