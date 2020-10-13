import React, { Component } from "react";
import { Form, Table } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { PROD_URL } from "../../Constants";

class InvoiceForm extends Component {

  state = {
    Idcliente: undefined,
    Fecha: undefined,
    Descuento: undefined,
    Total: undefined,
    checkToAdd: false,
    productos:[],
    prodActual: {}
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
    this.inputId = React.createRef();
    this.inputCant = React.createRef();
    const {factura} = this.props;
    if(factura.idFac !== -1)
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

  changeID = ()=>{
    this.setState({checkToAdd: false})
    if(this.inputId.value === "" || this.inputId.value < 1){
      console.log("Omitiendo fetch")
      this.setState({prodActual: {}})
      this.inputCant.value = "";
      return
    }

    fetch(PROD_URL+"/"+this.inputId.value, {method: "GET", headers: this.context.headers})
      .then(async (response) => {
        if(response.ok){
          let json = await response.json();
          this.setState({prodActual: json})
          this.inputCant.value = "";
        }
      })
  }

  addProd = ()=>{
    const {productos, prodActual} = this.state;
    let index = productos.findIndex((e)=>{ return e.idProd === prodActual.idProd});
    if(index != -1){
      productos[index].cantProd += parseInt(this.inputCant.value);
    }else{
      productos.push({...prodActual, cantProd: parseInt(this.inputCant.value)});
    }
    this.setState({productos: productos});
  }

checkToAdd = (targetValue)=>{
  this.setState({checkToAdd: targetValue > 0 && this.state.prodActual.nombreProd})
}

  handleChange = (event)=>{
    const {name, value} = event.target;
    //let valor = (name.includes("rol")) ? parseInt(value) : value;
    this.setState({[name]:value});
  }
  render() {
    const {Idcliente, Fecha, Descuento, TotalFac, productos, prodActual} = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Table bordered size="sm">
          <thead>
          <tr>
          <th>ID#</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          </tr>
          </thead>
          <tbody>
            { productos.map((e,i) => {
              return(
              <tr key={i}>
                <td>{e.idProd}</td>
                <td>{e.nombreProd}</td>
                <td>{e.cantProd}</td>
              </tr>)
            })} 
          </tbody>
        </Table>
        <div className=" row ">
        <label className="ml-3" >ID#</label>
        <input type="number" className="ml-2 col-2" onBlur={this.changeID} ref={ref => this.inputId = ref}/>

        { prodActual.nombreProd ? <label className="ml-2" >Cantidad</label> : null}
        { prodActual.nombreProd ? <input type="number" className="ml-2 col-1" min="1" ref={ref => this.inputCant = ref} onBlur={e => {this.checkToAdd(e.target.value)}} /> : null}
        

        <div className="ml-2 mt-1">{prodActual.nombreProd || ""}</div>
        <button type="button" className="btn btn-info btn-sm ml-auto mr-4" onClick={this.addProd} disabled={!this.state.checkToAdd}>Agregar</button>
        </div>
        
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default InvoiceForm;
