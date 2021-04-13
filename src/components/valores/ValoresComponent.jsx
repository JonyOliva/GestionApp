import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import CategoriasTable from "./CategoriasTable";
import { SesionContext } from "../inicio/SesionComponent";
import Tabs from "../otros/Tabs";
import { Alert } from "react-bootstrap";
import * as Products from "../ProductsHandler";
import * as Categories from "../CategoriesHandler";

class ValoresComponent extends Component {
  static contextType = SesionContext;
  state = {
    categorias: [],
    tablas: ["Productos", "Categorias"],
    activo: 0
  };

  getCategorias = async () => {
    await Categories.Get(this.context).then(categories => {
      this.setState({ categorias: categories });
    })
  };

  getProductos = async () => {
    if (!this.state.categorias)
      throw new Error("no categorias");

    let json = await Products.Get(this.context);
    if(json)
    this.setState({
      products: json.map((e) => {
        let categoria = this.state.categorias.find(
          (cat) => cat.idCat === e.idcategoriaProd
        );
        return { ...e, nombreCat: (categoria) ? categoria.nombreCat : "Sin categoria" };
      }),
    });
  };

  async componentDidMount() {
    try {
      await this.getCategorias();
      await this.getProductos(); 
    } catch (error) {
      this.context.alert.set(
        "Error: ",
        "danger",
        error.message
      );
    }
  }

  getCurrentTable = () => {
    const { activo, categorias } = this.state;
    if (activo === 0) {
      return <ProductsTable categorias={categorias} />;
    } else if (activo === 1) {
      return (
        <CategoriasTable
          categorias={categorias}
          Update={this.getCategorias}
        />
      );
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  render() {
    const { tablas, activo } = this.state;
    let alert = this.context.alert.get();
    return (
      <div className="container mt-2">
        <div className="d-flex">
          <h4 className="py-3">Valores</h4>
          <Alert
            className="ml-auto"
            variant={alert.style}
            show={alert.enable}
            onClose={this.context.alert.close}
            dismissible
          >
            {alert.head} {"  "}
            {alert.msg}
          </Alert>
        </div>
        <Tabs
          headers={tablas}
          activo={activo}
          onChange={this.ChangeActiveTab}
        />

        {this.getCurrentTable()}
      </div>
    );
  }
}

export default ValoresComponent;
