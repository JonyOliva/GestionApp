import React, { Component } from "react";
import { Form } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

class InvoiceForm extends Component {

  state = {
    Idcliente: undefined,
    Fecha: undefined,
    Descuento: undefined,
    Total: undefined
  };
  /* factura:{
    idFac: -1,
    IdclienteFac: undefined,
    FechaFac: undefined,
    DescuentoFac: undefined,
    TotalFac: undefined
  } */
  constructor(props){
    super(props);
    const {factura} = this.props;
    if(factura.IdFac !== -1)
    this.state = {
      Idcliente: factura.IdclienteFac,
      Fecha: factura.FechaFac,
      Descuento: factura.DescuentoFac,
      Total: factura.TotalFac
    }
    this.validator = new SimpleReactValidator();
  }

  onSubmit = (event) => {
    const {Idcliente, Fecha, Descuento, Total} = this.state;
    event.preventDefault();
    if(this.validator.allValid()){
      this.props.onSubmit({
        IdclienteFac: Idcliente,
        FechaFac: Fecha,
        DescuentoFac: Descuento,
        TotalFac: Total
      })
    }else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChange = (event)=>{
    const {name, value} = event.target;
    //let valor = (name.includes("rol")) ? parseInt(value) : value;
    this.setState({[name]:value});
  }
  render() {
    const {Idcliente, Fecha, Descuento, TotalFac} = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default InvoiceForm;
