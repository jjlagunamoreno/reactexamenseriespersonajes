import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { NavLink } from 'react-router-dom';

export default class LoadPersonajes extends Component {
  state = {
    personajes: [],
    idSerie: null
  }

  loadPersonajes = () => {
    const idSerie = window.location.pathname.split("/").pop();
    const request = '/api/Series/PersonajesSerie/' + idSerie;
    const url = Global.urlApiGlobal + request;

    axios.get(url).then(response => {
      console.log("Cargando personajes de la serie...");
      this.setState({
        personajes: response.data,
        idSerie: idSerie
      });
    }).catch(error => {
      console.error("Error al obtener los personajes de la serie:", error);
    });
  }

  componentDidMount = () => {
    this.loadPersonajes();
  }
  render() {
    return (
      <div className="container text-center my-5">
        <h2 className="display-4 mb-4">LOAD PERSONAJE</h2>
        <hr className="border border-primary opacity-100" />
        {/* Botón Volver */}
        <NavLink to={`/serie/${this.state.idSerie}`} className="btn btn-danger btn-lg btn-block mb-3">
          Volver
        </NavLink>

        {/* Tabla de personajes */}
        <table className="table">
          <thead>
            <tr>
              <th>PERSONAJE</th>
              <th>IMAGEN</th>
            </tr>
          </thead>
          <tbody>
            {this.state.personajes.map((personaje) => (
              <tr key={personaje.idPersonaje}>
                <td>{personaje.nombre}</td>
                <td>
                  <img
                    src={personaje.imagen}
                    alt={personaje.nombre}
                    style={{ width: '15%', height: 'auto' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
