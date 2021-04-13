import React, { Component } from "react";
import clear from "../../images/x.png"
import { Form, Table, InputGroup, Col } from "react-bootstrap";
import { SesionContext } from "../inicio/SesionComponent";
import SimpleReactValidator from "simple-react-validator";
import { CLI_URL } from "../../Constants";
import {GetByID as IdGetProd} from "../ProductsHandler";

class InvoiceForm extends Component {
  static contextType = SesionContext;
  state = {
    cliente: {},
    descuento: 0,
    checkToAdd: false,
    productos: [],
    prodActual: {},
    total: 0,
    subtotal: 0,
    alert: ""
  };

  constructor(props) {
    super(props);
    this.inputId = React.createRef();
    this.inputCant = React.createRef();
    this.validator = new SimpleReactValidator();
  }

  onSubmit = (event) => {
    const { descuento, total, cliente, productos } = this.state;
    let fecha = new Date();
    event.preventDefault();
    console.log({
      IdclienteFac: cliente.idCli,
      FechaFac: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
      ProductosFac: productos,
      DescuentoFac: descuento,
      TotalFac: total
    })
    return
    if (this.validator.allValid()) {
      this.props.onSubmit({
        IdclienteFac: undefined,
        FechaFac: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
        DescuentoFac: descuento,
        TotalFac: total
      })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  changeCl = (event) => {
    let idCli = event.target.value;
    fetch(CLI_URL + "/" + idCli, { method: "GET", headers: this.context.headers })
      .then(async (response) => {
        if (response.ok) {
          let json = await response.json();
          this.setState({ cliente: json })
        } else {
          this.setState({ cliente: {} })
        }
      })
  }

  changeID = async () => {
    //this.setState({alert: "Cargando..."})
    this.setState({ checkToAdd: false })
    if (this.inputId.value === "" || this.inputId.value < 1) {
      console.log("Omitiendo fetch")
      this.setState({ prodActual: {} })
      //this.setState({alert: ""})

      return
    }

    let p = await IdGetProd(this.context, this.inputId.value);
    this.setState({ prodActual: p });
    this.inputCant.value = "";
  }

  addProd = async () => {
    const { productos, prodActual } = this.state;
    let index = productos.findIndex((e) => { return e.idProd === prodActual.idProd });
    if (index !== -1) {
      productos[index].cantProd += parseInt(this.inputCant.value);
    } else {
      productos.push({ ...prodActual, cantProd: parseInt(this.inputCant.value) });
    }
    await this.setState({ productos: productos });
    await this.updateSubtotal();
    this.updateTotal();
    this.checkToAdd();
  }

  updateSubtotal = () => {
    const { productos } = this.state;
    this.setState({ subtotal: productos.reduce((acc, value) => { return acc + (value.precioProd * value.cantProd) }, 0) })
  }

  updateTotal = () => {
    const { subtotal, descuento } = this.state;
    if (descuento > 0) {
      let desc = subtotal * (descuento / 100);
      this.setState({ total: subtotal - desc })
    } else {
      this.setState({ total: subtotal })
    }
  }

  checkDesc = async (event) => {
    let porDesc = parseInt(event.target.value);
    if (porDesc > 0 && porDesc < 101) {
      await this.setState({ descuento: porDesc })
      this.updateTotal();
    } else {
      event.target.value = "";
      this.setState({ descuento: 0 })
    }
  }

  deleteProd = async (index) => {
    let newProductos = this.state.productos;
    newProductos.splice(index, 1);
    await this.setState({ productos: newProductos });
    await this.updateSubtotal();
    this.updateTotal();
  }

  checkToAdd = () => {
    let targetValue = parseInt(this.inputCant.value);
    const { prodActual, productos } = this.state;
    let index = productos.findIndex((e) => { return e.idProd === prodActual.idProd });
    let checkStock = false;
    if (index !== -1) {
      checkStock = productos[index].cantProd + targetValue <= prodActual.stockProd;
    } else {
      checkStock = targetValue <= prodActual.stockProd;
    }
    this.setState({ checkToAdd: targetValue > 0 && prodActual.nombreProd && checkStock })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    const { cliente, Descuento, productos, prodActual, total, subtotal } = this.state;
    return (
      <React.Fragment>
        {/*alert ? <Alert variant="warning" className="p-2 text-center">{alert}</Alert> : null*/}
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Col xs={4}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Cliente ID#</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="number" min="1" onBlur={this.changeCl} />
              </InputGroup>
            </Col>
            <Col className="text-center border align-self-center">
              {cliente.nombreCli || "" ?
                <div className="py-1">{cliente.nombreCli} {cliente.apellidoCli},  Dni: {cliente.dniCli}, Contacto: {cliente.nroCelularCli}
                </div> : ""}
            </Col>
          </Form.Row>
          <br />
          <h6>Productos</h6>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th></th>
                <th>ID#</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th style={{ width: "15%" }}>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((e, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center"><img src={clear} width="12px" alt="clear"
                      onClick={() => { this.deleteProd(i) }}></img></td>
                    <td>{e.idProd}</td>
                    <td>{e.nombreProd}</td>
                    <td>{e.cantProd}</td>
                    <td>{"$ " + e.precioProd}</td>
                  </tr>)
              })}
              <tr>
                <td colSpan="4" className="text-right">Subtotal $</td>
                <td> {productos.length > 0 ? subtotal : "-"} </td>
              </tr>
              <tr>
                <td colSpan="4" className="text-right">Descuento %
              </td>
                <td>
                  <input type="number" onBlur={this.checkDesc} min="1" style={{ width: "100%", border: "none", margin: "0" }} />
                </td>
              </tr>
              <tr>
                <td colSpan="4" className="text-right">Total $</td>
                <td> {productos.length > 0 ? total : "-"} </td>
              </tr>
            </tbody>
          </Table>
          <Form.Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Producto ID#</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="number" onBlur={this.changeID} ref={ref => this.inputId = ref} />
              </InputGroup>
            </Col>

            {
              prodActual.nombreProd ?
              <Col xs={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Cantidad</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="number" min="1" ref={ref => this.inputCant = ref} onBlur={e => { this.checkToAdd() }} />
                <InputGroup.Append>
                  <InputGroup.Text>Max: {prodActual.stockProd || ""}</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col> : ""
            }

            <button type="button" className="btn btn-info btn-sm ml-auto mr-4" onClick={this.addProd} disabled={!this.state.checkToAdd}>Agregar</button>
          </Form.Row>
          <Form.Row className="mt-2">
            {prodActual.nombreProd ?
            <Col xs={10}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Producto</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control disabled={true} value={"ID# "+ prodActual.idProd + " - " + prodActual.nombreProd} className="text-center"/>
            </InputGroup>
          </Col> : ""
            }
          </Form.Row>

          <hr />
          <Form.Row className="justify-content-around">
            <button type="submit" className="btn btn-primary btn-sm " disabled={!(productos.length > 0 && cliente.nombreCli)}>Guardar</button>
          </Form.Row>
        </Form>
      </React.Fragment>
    );
  }
}

export default InvoiceForm;
