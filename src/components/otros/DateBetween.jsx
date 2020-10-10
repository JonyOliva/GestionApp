import React, { Component } from 'react';
import clear from "../../images/x.png"

class DateBetween extends Component {

    clearButtonDate = (date, _name) => {
        if (date) {
            return (
                <img src={clear} width="12px" name={_name} alt="clear" className="mr-4 ml-2"
                    onClick={() => { 
                        this.props.changeDate(_name, "");
                     }}></img>
            );
        }
    }

    onChangeDate = (event) => {
        const {name, value} = event.target;
        this.props.changeDate(name, value);
      }

    render() {
        const { dates } = this.props;
        return (
            <React.Fragment>
                <label>Desde: </label>
                <input type="date" name="desde" className="ml-1" onChange={this.onChangeDate} />
                {this.clearButtonDate(dates.desde, "desde")}
                <label>Hasta: </label>
                <input type="date" name="hasta" className="ml-1"
                    min={dates.desde}  onChange={this.onChangeDate} />
                {this.clearButtonDate(dates.hasta, "hasta")}
            </React.Fragment>
        );
    }
}

export default DateBetween;