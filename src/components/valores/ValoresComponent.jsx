import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import CategoriasTable from "./CategoriasTable";
import {SesionContext} from "../inicio/SesionComponent";
import Tabs from "../otros/Tabs";
import { Alert } from "react-bootstrap";
import {CAT_URL, PROD_URL} from "../../Constants";
import {FetchData} from "../DataFunc";

class ValoresComponent extends Component {
  static contextType = SesionContext;
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

  setAlert = (head, style, msg, timeOut) => {
    const {timerId} = this.state.alert;
    if(timerId !== undefined)
      clearTimeout(timerId);
    let timer = (timeOut) ? setTimeout(this.AlertClose, 3000) : undefined;
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
    throw new Error("no categorias");
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
            return { ...e, nombreCat: (categoria) ? categoria.nombreCat : "Sin categoria" };
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
      this.setAlert(
        "Error:",
        "danger",
        "No se pudo conectar a la base de datos"
      );
    }
  }

  CategoriasHandler = async (method, cat, id) => {
    let url = (id!==undefined) ? CAT_URL + "/" + id : CAT_URL;
    this.setAlert("Cargando...", "warning", "Conectando con la base de datos");
    try {
      await FetchData(url, method, this.context.headers(), cat, this.setAlert);
      await this.getCategorias();
      await this.getProductos();
      //this.AlertClose();
    } catch (error) {
      this.setAlert(
        "Error:",
        "danger",
        "No se pudo conectar a la base de datos"
      );
    }
  };

  ProductosHandler = async (method, prod, id) => {
    let url = (id!==undefined) ? PROD_URL + "/" + id : PROD_URL
    this.setAlert("Cargando...", "warning", "Conectando con la base de datos");
    try {
      await FetchData(url, method, this.context.headers(), prod, this.setAlert);
      await this.getProductos();
      //this.AlertClose();
    } catch (error) {
      this.setAlert(
        "Error:",
        "danger",
        "No se pudo conectar a la base de datos"
      );
    }
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
        {this.getCurrentTable()}
      </div>
    );
  }
}

export default ValoresComponent;
