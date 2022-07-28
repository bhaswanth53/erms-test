import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, Link, BrowserRouter as Router, Routes } from 'react-router-dom';

import history from './history';

import Example from './components/Example'
import Listing from './components/Listing'
import Create from './components/Create'

const routing = (
    <Router history={history}>
        <div>
            <Routes>
                <Route exact path="/" element={<Listing/>} />
                <Route exact path="/create" element={<Create/>} />
            </Routes>
        </div>
    </Router>
)

export default routing