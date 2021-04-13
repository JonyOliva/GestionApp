import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { SesionContext } from "../inicio/SesionComponent";
import SimpleReactValidator from "simple-react-validator";
import * as Customers from "../CustomersHandler";

class ClientForm extends Component {
    static contextType = SesionContext;
    state = {
        idCli: -1,
        nombre: "",
        apellido: "",
        dni: "",
        nroCel: ""
    };

    constructor(props) {
        super(props);
        const { cliente } = this.props;
        if (cliente.idCl !== -1)
            this.state = {
                idCli: cliente.idCl,
                nombre: cliente.nombreCli,
                apellido: cliente.apellidoCli,
                dni: cliente.dniCli,
                nroCel: cliente.nroCelularCli
            }

        this.validator = new SimpleReactValidator();
    }

    onSubmit = async (event) => {
        const { nombre, apellido, dni, nroCel } = this.state;
        event.preventDefault();
        if (this.validator.allValid()) {
            let customer = {
                NombreCli: nombre,
                ApellidoCli: apellido,
                DniCli: dni,
                NroCelularCli: nroCel
            }
            if(this.props.cliente.idCli !== -1){
                await Customers.Put(this.context, this.props.cliente.idCli, {...customer, idCli: this.props.cliente.idCli});
            }else{
                await Customers.Post(this.context, customer);
            }
            this.props.onSubmit();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    render() {
        const { nombre, apellido, dni, nroCel } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={nombre} onChange={this.handleChange} />
                    <div className="text-danger">{this.validator.message("name", nombre, 'required|alpha_space')}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="apellido" value={apellido} onChange={this.handleChange} />
                    <div className="text-danger">{this.validator.message("last_name", apellido, 'required|alpha_space')}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dni</Form.Label>
                    <Form.Control type="text" name="dni" value={dni} onChange={this.handleChange} />
                    <div className="text-danger">{this.validator.message("dni", dni, 'required|numeric|size:8')}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nro. Celular</Form.Label>
                    <Form.Control type="text" name="nroCel" value={nroCel} onChange={this.handleChange} />
                    <div className="text-danger">{this.validator.message("nroCel", nroCel, 'phone')}</div>
                </Form.Group>
                <hr />
                <div className="row justify-content-around">
                    <button type="submit" className="btn btn-primary btn-sm ">Guardar</button>
                </div>
            </Form>
        );
    }
}

export default ClientForm;
