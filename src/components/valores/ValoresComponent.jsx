import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import CategoriasTable from "./CategoriasTable";
import Tabs from "../otros/Tabs";
import { Alert } from "react-bootstrap";

const CAT_URL = "http://localhost:9090/api/Categorias";
const PROD_URL = "http://localhost:9090/api/Productos";

class ValoresComponent extends Component {
  state = {
    products: [],
    categorias: [],
    tablas: ["Productos", "Categorias"],
    activo: 0,
    alert: {
      enable: false,
      style: "",
      head: "",
      msg: "",
      timerId: undefined
    },
  };

  getCategorias = async () => {
    await fetch(CAT_URL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ categorias: json });
      })
      .catch((error) => {
        throw error;
      });
  };

  setAlert = (head, style, msg) => {
    const {timerId} = this.state.alert;
    if(timerId !== undefined)
      clearTimeout(timerId);
    let timer = setTimeout(this.AlertClose, 3000);
    this.setState({
      alert: {
        enable: true,
        head: head,
        style: style,
        msg: msg,
        timerId: timer
      },
    });
  };

  getProductos = async () => {
    if (this.state.categorias.length === 0)
    throw "no categorias";
    await fetch(PROD_URL)
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
        throw error;
      });
  };

  async componentDidMount() {
    this.setAlert("Cargando...", "warning", "Conectando con la base de datos");
    try {
      await this.getCategorias();
      await this.getProductos();
      this.AlertClose();
    } catch (error) {
      console.log(error)
      this.setAlert(
        "Error",
        "danger",
        "No se pudo conectar a la base de datos"
      );
    }
  }

  FetchData = async (url, method, data) => {
    await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if(resp.ok)
          this.setAlert("Guardado", "success", "");
        else
          throw "error";
      })
      .catch((error) => this.setAlert("Error", "danger", ""));
  }

  CategoriasHandler = async (method, cat, id) => {
    let url = (id!==undefined) ? CAT_URL + "/" + id : CAT_URL;
    await this.FetchData(url, method, cat);
    await this.getCategorias();
  };

  ProductosHandler = async (method, prod, id) => {
    let url = (id!==undefined) ? PROD_URL + "/" + id : PROD_URL
    await this.FetchData(url, method, prod);
    await this.getProductos();
  };

  getCurrentTable = () => {
    const { activo, categorias, products } = this.state;
    if (activo === 0) {
      return <ProductsTable products={products} categorias={categorias} postData={this.ProductosHandler}/>;
    } else if (activo === 1) {
      return (
        <CategoriasTable
          categorias={categorias}
          postData={this.CategoriasHandler}
        />
      );
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  AlertClose = () => {
    const { alert } = this.state;
    this.setState({ alert: { ...alert, enable: false } });
  };

  render() {
    const { tablas, activo, alert } = this.state;
    return (
      <div className="container mt-2">
        <h4>Valores</h4>
        <div className="row">
        <Tabs
          headers={tablas}
          activo={activo}
          onChange={this.ChangeActiveTab}
        />
        <div className="w-50 m-auto">
          <Alert
            className="mb-0"
            variant={alert.style}
            show={alert.enable}
            onClose={this.AlertClose}
            dismissible
          >
            {alert.head} {"  "} 
            {alert.msg}
          </Alert>
        </div>
        </div>
        {this.getCurrentTable()}
      </div>
    );
  }
}

export default ValoresComponent;
