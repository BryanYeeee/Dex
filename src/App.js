import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Pokedex from './pages/Pokedex.js';

class App extends Component {

    render() {
        return (
            <React.StrictMode>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dex" element={<Pokedex />} />
                    </Routes>
                </Router>
            </React.StrictMode>
        )
    }
}

export default App;