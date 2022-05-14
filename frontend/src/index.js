import React from 'react';
import ReactDOM from 'react-DOM/client';
import App from './App';
import Cart from './routes/Cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='cart' element={<Cart />}></Route>
            </Route>

        </Routes>
    </BrowserRouter>
);