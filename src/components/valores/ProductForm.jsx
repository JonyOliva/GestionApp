import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { SesionContext } from "../inicio/SesionComponent";
import * as Product from "../ProductsHandler";

class ProductForm extends Component {
  static contextType = SesionContext;
  state = {
    nombre: "",
    categoria: -1,
    stock: 0,
    precio: 0
  };

  constructor(props){
    super(props);
    const {producto} = this.props;
    if(producto.idProd !== -1)
    this.state = {
      nombre: producto.nombreProd,
      categoria: producto.idcategoriaProd,
      stock: producto.stockProd,
      precio: producto.precioProd
    }
    this.validator = new SimpleReactValidator();
  }

  onSubmit = async (event) => {
    event.preventDefault();
    if(this.validator.allValid()){
      let data = {
        nombreProd: this.state.nombre,
        idcategoriaProd: (this.state.categoria===-1) ? 1 : this.state.categoria,
        stockProd: parseInt(this.state.stock),
        precioProd: parseInt(this.state.precio),
      };
      if(this.props.producto.idProd !== -1){
        await Product.Put(this.context, this.props.producto.idProd, {...data, idProd: this.props.producto.idProd});
      }else{
        await Product.Post(this.context, data);
      }
      this.props.onSubmit();
    }else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleChange = (event)=>{
    const {name, value} = event.target;
    let valor = value;
    if(name === "categoria")
      valor = parseInt(value);
    this.setState({[name]:valor});
  }
  render() {
    const { categorias } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange}/>
          <div className="text-danger">{this.validator.message("name", this.state.nombre, 'required')}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            as="select"
            name="categoria"
            value={this.state.categoria}
            onChange={this.handleChange}
          >
            {categorias.map((c, i) => {
              return (
                <option key={i} value={c.idCat}>
                  {c.nombreCat}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Stock</Form.Label>
          <Form.Control name="stock" type="number" value={this.state.stock} onChange={this.handleChange}/>
          <div className="text-danger">{this.validator.message("stock", this.state.stock, "required|numeric|min:1,num")}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control name="precio" type="number" value={this.state.precio} onChange={this.handleChange}/>
          </InputGroup>
          <div className="text-danger">{this.validator.message("price", this.state.precio, "required|numeric|min:1,num")}</div>
        </Form.Group>
        <hr />
        <div className="row justify-content-around">
          <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
        </div>
      </Form>
    );
  }
}

export default ProductForm;
