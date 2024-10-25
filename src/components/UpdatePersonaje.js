import React, { Component } from 'react'

export default class UpdatePersonaje extends Component {
  render() {
    return (
      <div className="container-fluid mt-3">
        <h1>Modificar personaje</h1>
        <hr className="border border-primary opacity-100" />

        <form>
          <div className="mt-3">
            <label className="form-label">Serie</label>
            <select className="form-select">
              
            </select>
          </div>

          <div className="mt-3">
            <label className="form-label">Personaje</label>
            <select className="form-select">

            </select>
          </div>

          <button className="btn btn-success w-100 mt-3">Modificar personaje</button>
        </form>

        <div className="row mt-3">
          <div className="col-6">

          </div>
          <div className="col-6">

          </div>
        </div>
      </div>
    )
  }
}
