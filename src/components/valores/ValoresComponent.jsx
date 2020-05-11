import React, { Component } from "react";
import ProductsTable from "./ProductsTable";
import CategoriasTable from "./CategoriasTable";
import Tabs from "../otros/Tabs";
import { Alert } from "react-bootstrap";

class ValoresComponent extends Component {
  state = {
    products: [],
    categorias: [],
    tablas: ["Productos", "Categorias"],
    activo: 0,
    alert: {
      state: false,
      style: "",
      head: "",
      msg: "",
    }
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
    const { activo, categorias, products } = this.state;
    if (activo === 0) {
      return (
        <ProductsTable products={products} categorias={categorias}/>
      );
    } else if (activo === 1) {
      return <CategoriasTable categorias={categorias} />;
    }
  };

  ChangeActiveTab = (index) => {
    this.setState({ activo: index });
  };

  AlertHandle = () => {
    const { alert } = this.state;
    this.setState({ alert: { ...alert, state: false } });
  };

  render() {
    const { tablas, activo, alert } = this.state;
    console.log(this.state.products)
    return (
      <div className="container mt-2">
        <h4>Valores</h4>
        <Tabs
          headers={tablas}
          activo={activo}
          onChange={this.ChangeActiveTab}
        />
        {this.getCurrentTable()}
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
