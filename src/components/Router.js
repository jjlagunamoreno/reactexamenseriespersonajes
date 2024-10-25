import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import NotFound from './NotFound'
import LoadSerie from './LoadSerie'
import CreatePersonaje from './CreatePersonaje'
import UpdatePersonaje from './UpdatePersonaje'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/serie/:idseries" element={<LoadSerie />} />
                    <Route path='/create' element={<CreatePersonaje />} />
                    <Route path='/update' element={<UpdatePersonaje />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
