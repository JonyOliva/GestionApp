import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import CustomModal from '../otros/CustomModal';
import DateBetween from '../otros/DateBetween';
import DeleteBtn from "../otros/DeleteBtn";
import EditBtn from "../otros/EditBtn";
import InvoiceForm from './InvoiceForm';

const facs = [
  {
    idf: "0011",
    idc: "001",
    fecha: "10/05/2020",
    desc: 10,
    total: 1000,
  },
  {
    idf: "002",
    idc: "001",
    fecha: "10/08/2019",
    desc: 0,
    total: 2000,
  },
  {
    idf: "003",
    idc: "002",
    fecha: "27/05/2019",
    desc: 10,
    total: 1640,
  },
];

class InvoicesTable extends Component {
  state = {
    modalIsOpen: false,
    modalHeader: "Nueva",
    filtroFecha:{
      desde: "",
      hasta: ""
    }
  }

  changeDate = (_name, value) => {
    this.setState({filtroFecha:{...this.state.filtroFecha, [_name]: value}})
    console.log(this.state.filtroFecha)
  }

  resetState = () => {
    this.setState({
      factura: {
        idFac: -1,
        IdclienteFac: undefined,
        FechaFac: undefined,
        DescuentoFac: undefined,
        TotalFac: undefined
      }
    })
  }

  ModalHandle = (_id) => {
    const { modalIsOpen } = this.state;
    this.setState({ modalIsOpen: !modalIsOpen });
    if (_id !== undefined) {
      this.setState({ modalHeader: "Modificar" });
      this.setState({
        factura: this.props.facturas.find((e) => e.idProd === _id),
      });
    } else {
      this.setState({ modalHeader: "Nueva" });
      this.resetState();
    }
  };

  render() {
    const {modalHeader, modalIsOpen, filtroFecha} = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="mb-2 mt-2 ml-3 mr-auto">
            <DateBetween changeDate={this.changeDate} dates={filtroFecha}/>
          </div>
          <button
            onClick={() => {
              this.ModalHandle(undefined);
            }}
            className="btn btn-primary btn-sm mb-2 mt-2 ml-auto mr-4"
          >
            {" "}
            Nuevo
          </button>
        </div>
        <Table bordered striped hover>
          <thead>
            <tr>
              <th># ID Factura</th>
              <th># ID Cliente</th>
              <th>Fecha</th>
              <th>Descuento</th>
              <th>Total</th>
              <th width="12%"></th>
            </tr>
          </thead>
          <tbody>
            {facs.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.idf}</td>
                  <td>{e.idc}</td>
                  <td>{e.fecha}</td>
                  <td>{e.desc > 0 ? e.desc + "%" : "-"}</td>
                  <td>${e.total}</td>
                  <td align="center">
                    <EditBtn />
                    <DeleteBtn />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <CustomModal hide={() => {
          this.setState({ modalIsOpen: false });
        }}
          size={"lg"}
          backdrop={"static"}
          title={modalHeader + " factura"}
          isOpen={modalIsOpen}>
            <InvoiceForm/>
        </CustomModal>
      </React.Fragment>
    );
  }
}

export default InvoicesTable;