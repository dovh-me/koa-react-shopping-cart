import React, { Component } from "react";
import { Outlet, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginToken: localStorage.getItem('loginToken')
        }
        this.checkLoginToken = this.checkLoginToken.bind(this);
    }

    handleErrors() {
        // todo - handling at component level
    }

    checkLoginToken(token) {
        const tokenFromLocalStorage = localStorage.getItem('loginToken');
        this.setState({ loginToken: tokenFromLocalStorage });
    }

    render() {
        const loginToken = this.state.loginToken;
        if (loginToken === null || loginToken === undefined) {
            return (
                <div>
                    <div id="errors"></div>
                    <Login onLoginSuccess={this.checkLoginToken} />
                </div>
            )
        } else {
            return <div>Already logged in!</div>
        }
    }
}

export default App;