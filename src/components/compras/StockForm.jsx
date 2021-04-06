import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { SesionContext } from "../inicio/SesionComponent";
import * as Product from "../ProductsHandler";
import * as Stock from "../StocksHandler";

class StockForm extends Component {
  static contextType = SesionContext;

  state = {
    nombre: "",
    producto: {},
    stock: 0,
    fecha: new Date().toISOString().substr(0,10)
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.prodInput = React.createRef();
  }

  onSubmit = (event) => {
    const {producto, fecha, stock} = this.state;
    event.preventDefault();
    if (this.validator.allValid()) {
      let data = {
        IDProducto_Rep: producto.idProd,
        Cantidad_Rep: parseInt(stock),
        Fecha_Rep: fecha
      }
      Stock.PostStock(this.context, data, undefined);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  checkProductId = async () => {
    let prod = await Product.GetByID(this.context, this.prodInput.current.value, undefined);
    if(prod)
      this.setState({producto: prod})
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    let valor = value;
    if (name === "stock")
      valor = parseInt(value);
    this.setState({ [name]: valor });
  }
  render() {
    const { producto } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>#ID Producto</Form.Label>
          <Row>
            <Col xs={3}>
            <Form.Control name="producto" type="number" onBlur={this.checkProductId} ref={this.prodInput} />
            </Col>
            <Col className="border mr-3 px-1 align-self-center text-center">
            <div >
              {producto ? producto.nombreProd : ""}
            </div>
            </Col>
          </Row>
          <div className="text-danger">{this.validator.message("producto", this.state.producto.idProd, "required|numeric|min:1,num")}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cantidad</Form.Label>
          <Form.Control name="stock" type="number" value={this.state.stock} onChange={this.handleChange} />
          <div className="text-danger">{this.validator.message("stock", this.state.stock, "required|numeric|min:1,num")}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha</Form.Label>
          <Form.Control name="fecha" type="date" value={this.state.fecha} onChange={this.handleChange} />
          <div className="text-danger">{this.validator.message("fecha", this.state.fecha, "required")}</div>
        </Form.Group>
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default StockForm;
