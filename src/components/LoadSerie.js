import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { NavLink } from 'react-router-dom';

export default class LoadSerie extends Component {
    state = {
        serie: {},
        idSerie: null
    }

    loadSerie = () => {
        const idSerie = window.location.pathname.split("/").pop();
        const request = '/api/Series/' + idSerie;
        const url = Global.urlApiGlobal + request;

        axios.get(url).then(response => {
            console.log("Cargando serie específica...");
            this.setState({
                serie: response.data
            });
        }).catch(error => {
            console.error("Error al cargar la serie:", error);
        });
    }

    componentDidMount = () => {
        this.loadSerie();
    }

    // CREO QUE SERÍA CON ALGO ASÍ PERO NO ME SALE EL RECARGAR LA URL
    // componentDidUpdate = (oldProps) => {
    //     //NUNCA LLAMAREMOS A NADA SI NO TENEMOS AQUI UN IF
    //     if (idSerie !== this.state.idSerie) {
    //         this.loadSerie();
    //     }
    // }

    render() {
        return (
            <div className="container-fluid mt-3">
                <hr className="border border-primary opacity-100" />

                <div className="card">
                    <img
                        className="card-img-top"
                        alt={`Imagen de ${this.state.serie.nombre}`}
                        src={this.state.serie.imagen}
                        style={{ height: '250px', width: '250px', display: 'block' }}
                    />

                    <div className="card-body">
                        <h5 className="card-title">{this.state.serie.nombre}</h5>
                        <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                        <p className="card-text">Año: {this.state.serie.anyo}</p>
                        <NavLink className="btn btn-primary w-100" to={`/personajes/${this.state.serie.idSerie}`}>
                            Personajes
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}
