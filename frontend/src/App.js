import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import LoginScreen from './components/LoginScreen';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginToken: undefined
        }
    }

    render() {
        return (
            <div className="App">
                <LoginScreen />
            </div>
        );
    }
}

export default App;