import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {
  cajaNombre = React.createRef();
  cajaImagen = React.createRef();
  cajaSerie = React.createRef();

  state = {
    status: false,
    series: [],
    idSerie: null
  }

  insertarPersonaje = (e) => {
    e.preventDefault();

    let nombre = this.cajaNombre.current.value;
    let imagen = this.cajaImagen.current.value;
    let idSerie = this.cajaSerie.current.value;

    let personaje = {
      nombre: nombre,
      imagen: imagen,
      idSerie: parseInt(idSerie)
    };

    let url = Global.urlApiGlobal + "/api/Personajes";
    axios.post(url, personaje).then(response => {
      console.log("Creando personaje...");
      this.setState({
        status: true,
        idSerie: idSerie
      });
    }).catch(error => {
      console.error("Error al crear el personaje:", error);
    });
  }

  loadseries = () => {
    let url = Global.urlApiGlobal + "/api/Series";
    axios.get(url).then(response => {
      console.log("Leyendo servicio para select...");
      this.setState({
        series: response.data
      });
    }).catch(error => {
      console.error("Error al cargar las series:", error);
    });
  }

  componentDidMount = () => {
    this.loadseries();
  }

  render() {
    if (this.state.status === true) {
      return (<Navigate to={`/serie/${this.state.idSerie}`} />);
    } else {
      return (
        <div className="container-fluid mt-3">
          <h1>Crear personaje</h1>
          <hr className="border border-primary opacity-100" />

          <form onSubmit={this.insertarPersonaje}>
            <div className="mt-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" type="text" ref={this.cajaNombre} />
            </div>

            <div className="mt-3">
              <label className="form-label">Imagen</label>
              <input className="form-control" type="text" ref={this.cajaImagen} />
            </div>

            <div className="mt-3">
              <label className="form-label">Serie</label>
              <select className="form-select" ref={this.cajaSerie}>
                {this.state.series.map((serie) => (
                  <option key={serie.idSerie} value={serie.idSerie}>
                    {serie.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-success mt-3 w-100">Crear personaje</button>
          </form>
        </div>
      );
    }
  }
}
