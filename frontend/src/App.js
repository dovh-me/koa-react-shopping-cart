import React, { Component } from "react";
import { Outlet, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Store from './pages/Store';
import Cart from './pages/Cart';
import Logout from './pages/Logout';
import Wishlist from './pages/WishList';
import Inventory from "./pages/Inventory";
import SearchCustomer from "./pages/SearchCustomer";
import { NavBar } from './components/NavBar';

import "./App.css";
import Welcome from "./pages/TempLogin";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginSuccess: false,
            loginData: undefined
        }
        this.setLoginSuccess = this.setLoginSuccess.bind(this);
        this.setLogoutSuccess = this.setLogoutSuccess.bind(this);
        this.saveAppState = this.saveAppState.bind(this);
    }

    componentDidMount() {
        // load the state from the local storage
        this.loadAppState();
    }

    componentDidUpdate() {
        // update the state in the local storage
        this.saveAppState();
    }

    componentWillUnmount() {
        // update the state in local storage
        this.saveAppState();
    }

    loadAppState() {
        const savedState = localStorage.getItem('shoppingCartAppState');
        // todo: validate the fields in the fetched object before updating the state
        if (savedState !== 'undefined' && savedState) {
            const parsed = JSON.parse(savedState);
            this.setState(parsed);
        }
    }

    saveAppState() {
        localStorage.setItem('shoppingCartAppState', JSON.stringify(this.state));
    }

    setLoginSuccess(data) {
        this.setState({ isLoginSuccess: true, loginData: data });
    }

    setLogoutSuccess() {
        this.setState({ isLoginSuccess: false, loginData: undefined });
    }

    render() {
        // const loginToken = this.state.loginToken;
        // if (loginToken === null || loginToken === undefined) {
        //     return (
        //         <div>
        //             <div id="errors"></div>
        //             <Login onLoginSuccess={this.checkLoginToken} />
        //         </div>
        //     )
        // } else {
        //     return <div>Already logged in!</div>
        // }

        return (
            <div>
                <NavBar isLoggedIn={this.state.isLoginSuccess} loginData={this.state.loginData} />
                <Routes>
                // render the login page if loginToken is not set. Else render the dashboard
                    <Route path="/" element={<Login onLoginSuccess={this.setLoginSuccess} isLoginSuccess={this.state.isLoginSuccess} />} />
                    <Route path="/home" element={<Home isLoggedIn={this.state.isLoginSuccess} loginData={this.state.loginData} />} />
                    <Route path="/logout" element={<Logout onLogoutSuccess={this.setLogoutSuccess} />} />
                    <Route path="/store" element={<Store loginData={this.state.loginData} />} />
                    <Route path="/customer/cart" element={<Cart loginData={this.state.loginData} />} />
                    <Route path="/customer/store" element={<Store loginData={this.state.loginData} />} />
                    <Route path="/customer/wishlist" element={<Wishlist loginData={this.state.loginData} />} />
                    <Route path="/trader/inventory" element={<Inventory loginData={this.state.loginData} />} />
                    <Route path="/trader/searchCustomer" element={<SearchCustomer loginData={this.state.loginData} />} />
                </Routes>
            </div>
        )
    }
}

export default App;