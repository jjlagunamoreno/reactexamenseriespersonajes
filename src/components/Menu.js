import React, { Component } from 'react'
import imagenLogo from './../assets/images/logo.png'
import axios from 'axios'
import Global from './Global';
import { NavLink } from 'react-router-dom'

export default class Menu extends Component {
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
            <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
                <div className="container-fluid">
                    <img src={imagenLogo} alt="Logo" style={{ width: '5%' }} />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" aria-current="page" to="/create">Nuevo personaje</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" aria-current="page" to="/update">Modificar personaje</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown" aria-expanded="false">Series</a>
                                <ul className="dropdown-menu">
                                    {this.state.series.map((serie) => (
                                        <li key={serie.idSerie}>
                                            <NavLink
                                                to={"/serie/" + serie.idSerie}
                                                className="dropdown-item">{serie.nombre}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
