import React from 'react'; // Import react framework
import ReactDOM from 'react-dom'; // Import DOM library
import { Route, NavLink, Link, BrowserRouter as Router, Routes } from 'react-router-dom';

import history from './history';

// Import components
import Example from './components/Example'
import Listing from './components/Listing'
import Create from './components/Create'

// Initiate Router
const routing = (
    <Router history={history}>
        <div>
            {/* Define Routes */}
            <Routes>
                <Route exact path="/" element={<Listing/>} />
                <Route exact path="/create" element={<Create/>} />
            </Routes>
        </div>
    </Router>
)

// Export router
export default routing