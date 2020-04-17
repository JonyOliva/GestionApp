import React, { Component } from 'react';
import { InputGroup, FormControl } from "react-bootstrap";

class Buscador extends Component {
    state = {  }
    render() { 
        return ( 
            <InputGroup size="sm" className="mt-2 mb-2 col-6">
            <InputGroup.Append>
                <InputGroup.Text>
                Buscar
                </InputGroup.Text>
            </InputGroup.Append>
            <FormControl onChange={(e)=>{this.props.onChange(e.target.value)}} type="text" />
            </InputGroup>
         );
    }
}
 
export default Buscador;