import React from 'react';
import ReactDOM from 'react-DOM/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Logout from './pages/Logout';
import { NavBar } from './components/NavBar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <NavBar />
        <Routes>
            // render the login page if loginToken is not set. Else render the dashboard
            <Route path="/" element={<App />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/store" element={<Store />} />
            <Route path="/customer/cart" element={<Cart />} />
            <Route path="/customer/store" element={<Store />} />
        </Routes>
    </BrowserRouter>
);