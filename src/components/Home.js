import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate, NavLink } from 'react-router-dom'
import imgHome from '../assets/images/imgHome.jpg'

export default class Home extends Component {

    render() {
        return (
            <div className="container text-center my-5">
                <h1 className="display-4 mb-4">HOME SERIES</h1>
                <hr className="border border-primary opacity-100" />
                <img src={imgHome} alt="imagenHome" className="img-fluid rounded" style={{ maxWidth: '75%' }} />
            </div>
        )
    }
}