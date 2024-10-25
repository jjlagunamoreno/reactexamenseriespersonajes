import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global';
import { NavLink } from 'react-router-dom'

export default class LoadSerie extends Component {
    state = {
        series: []
    }

    loadseries = () => {
        var request = "/api/Series";
        var url = Global.urlApiGlobal + request;
        axios.get(url).then(response => {
            console.log("leyendo servicio para menu...");
            this.setState({
                series: response.data
            });
        }).catch(error => {
            console.error("Error al cargar las series: ", error);
        });
    }

    componentDidMount = () => {
        this.loadseries();
    }
    render() {
        return (
            <div className="container-fluid mt-3">
                <hr className="border border-primary opacity-100" />

                <div className="card">

                    <div className="card-body">

                    </div>
                </div>
            </div>
        )
    }
}
