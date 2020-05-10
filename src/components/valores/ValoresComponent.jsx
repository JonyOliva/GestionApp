import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import CategoriasTable from "./CategoriasTable";
import Tabs from "../otros/Tabs";
import ProductForm from "./ProductForm";
import Buscador from "../otros/Buscador";
import { Modal, Alert } from "react-bootstrap";

class ValoresComponent extends Component {
  state = {
    products: [],
    categorias: [],
    tablas: ["Productos", "Categorias"],
    activo: 0,
    modalIsOpen: false,
    alert: {
      state: false,
      style: "",
      head: "",
      msg: "",
    },
    product: { idProd: 0 },
    search: ""
  };

  async componentDidMount() {
    await fetch("http://localhost:9090/api/Categorias")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ categorias: json });
      })
      .catch((error) => {
        this.setState({
          error: {
            state: true,
            head: "Error",
            style: "danger",
            msg: "No se pudo conectar a la base de datos",
          },
        });
      });

    await fetch("http://localhost:9090/api/Productos")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          products: json.map((e) => {
            let categoria = this.state.categorias.find(
              (cat) => cat.idCat === e.idcategoriaProd
            );
            return { ...e, nombreCat: categoria.nombreCat };
          }),
        });
      })
      .catch((error) => {
        this.setState({
          alert: {
            state: true,
            head: "Error",
            style: "danger",
            msg: "No se pudo conectar a la base de datos",
          },
        });
      });
  }

  getCurrentTable = () => {
    const { activo } = this.state;
    if (activo === 0) {
      return (
        <ProductsTable products={this.state.products} onEdit={this.onEdit} search={this.state.search}/>
      );
    } else if (activo === 1) {
      return <CategoriasTable categorias={this.state.categorias} />;
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  ModalHandle = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    if(!this.state.modalIsOpen){
      this.setState({
        product: {
          idProd: -1,
          nombreProd: "",
          idcategoriaProd: "",
          stockProd: "",
          precioProd: ""
        }})
    }
  };

searchHandle = (str)=>{
  this.setState({search: this.state.search + str});
}

  onEdit = (_id) => {
    this.ModalHandle();
    this.setState({
      product: this.state.products.find((e) => e.idProd === _id),
    });
  };

  onNew  = () => {
    this.ModalHandle();

  }

  AlertHandle = () => {
    const { alert } = this.state;
    this.setState({ alert: { ...alert, state: false } });
  };

  render() {
    const { tablas, activo, modalIsOpen, alert, categorias } = this.state;
    return (
      <div className="container mt-2">
        <h4>Valores</h4>
        <Tabs
          headers={tablas}
          activo={activo}
          onChange={this.ChangeActiveTab}
        />
        <div className="row">
        <Buscador onChange={this.searchHandle} />
        <button onClick={this.onNew} className="btn btn-primary btn-sm mb-2 mt-2 ml-auto mr-4"> Nuevo</button>
        </div>
        {this.getCurrentTable()}

        <Modal show={modalIsOpen} onHide={this.ModalHandle} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modificar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductForm product={this.state.product} categorias={categorias} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary btn-sm">Guardar</button>
            <button
              onClick={this.ModalHandle}
              className="btn btn-danger btn-sm"
            >
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
        <div className="w-50 m-auto">
          <Alert
            variant={alert.style}
            show={alert.state}
            onClose={this.AlertHandle}
            dismissible
          >
            <Alert.Heading>{alert.head}</Alert.Heading>
            <p>{alert.msg}</p>
          </Alert>
        </div>
      </div>
    );
  }
}

export default ValoresComponent;
