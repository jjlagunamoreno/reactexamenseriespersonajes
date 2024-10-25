import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';

export default class UpdatePersonaje extends Component {
  state = {
    series: [],
    personajes: [],
    selectedSerie: null,
    selectedPersonaje: null
  };

  // cargamos las series en su select
  loadSeries = () => {
    const url = Global.urlApiGlobal + '/api/Series';
    axios.get(url).then(response => {
      this.setState({
        series: response.data,
        selectedSerie: response.data[0]
      });
    }).catch(error => {
      console.error("Error al cargar las series:", error);
    });
  };

  // cargamos los personajes en su select
  loadPersonajes = () => {
    const url = Global.urlApiGlobal + '/api/Personajes';
    axios.get(url).then(response => {
      this.setState({
        personajes: response.data,
        selectedPersonaje: response.data[0]
      });
    }).catch(error => {
      console.error("Error al cargar los personajes:", error);
    });
  };

  // los handle Change los tenemos para pasarle el id de Serie o de Personaje según se vaya eligiendo el option, y lo actualizamos con setState.
  handleSerieChange = (e) => {
    const selectedSerie = this.state.series.find(serie => serie.idSerie === parseInt(e.target.value));
    this.setState({ selectedSerie });
  };
  handlePersonajeChange = (e) => {
    const selectedPersonaje = this.state.personajes.find(personaje => personaje.idPersonaje === parseInt(e.target.value));
    this.setState({ selectedPersonaje });
  };

  moverPersonaje = (e) => {
    e.preventDefault();
    const url = Global.urlApiGlobal + '/api/Personajes/' + this.state.selectedPersonaje.idPersonaje + '/' + this.state.selectedSerie.idSerie;
    //movemos el personaje con el put a otra serie mediatne axios y avisamos al usuario, después lo redirigimos.
    axios.put(url).then(() => {
      alert("Personaje movido a nueva serie con éxito.");
      window.location.href = '/serie/' + this.state.selectedSerie.idSerie;
    }).catch(error => {
      console.error("Error al mover el personaje:", error);
      alert("Error al mover el personaje a la nueva serie.");
    });
  };

  componentDidMount = () => {
    this.loadSeries();
    this.loadPersonajes();
  };

  render() {
    return (
      <div className="container-fluid mt-3">
        <h1>Modificar personaje</h1>
        <hr className="border border-primary opacity-100" />

        {/* al rellenear el formulario se mueve un personaje a la serie indicada */}
        <form onSubmit={this.moverPersonaje}>
          {/* select de series */}
          <div className="mt-3">
            <label className="form-label">Serie</label>
            <select className="form-select" onChange={this.handleSerieChange} value={this.state.selectedSerie ? this.state.selectedSerie.idSerie : ''}>
              {this.state.series.map(serie => (
                <option key={serie.idSerie} value={serie.idSerie}>
                  {serie.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            {/* select de personaje */}
            <label className="form-label">Personaje</label>
            <select className="form-select" onChange={this.handlePersonajeChange} value={this.state.selectedPersonaje ? this.state.selectedPersonaje.idPersonaje : ''}>
              {this.state.personajes.map(personaje => (
                <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                  {personaje.nombre}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-success w-100 mt-3">Modificar personaje</button>
        </form>

        {/* divs donde mostraremos las imagenes de los select */}
        <div className="row mt-3">
          <div className="col-6">
            {this.state.selectedSerie && (
              <div>
                <h3>{this.state.selectedSerie.nombre}</h3>
                <hr className="border border-primary opacity-100" />
                <img className="img-fluid" src={this.state.selectedSerie.imagen} alt="Serie seleccionada" />
              </div>
            )}
          </div>
          <div className="col-6">
            {this.state.selectedPersonaje && (
              <div>
                <h3>{this.state.selectedPersonaje.nombre}</h3>
                <hr className="border border-primary opacity-100" />
                <img className="img-fluid" src={this.state.selectedPersonaje.imagen} alt="Personaje seleccionado" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
