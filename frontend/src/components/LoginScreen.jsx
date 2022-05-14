import React from 'react';
import LoginSection from './LoginSection';
import CreateProfileSection from './CreateProfileSection';
import Cart from '../routes/Cart';

class LoginScreen extends React.Component {
    handleTraderCreate() {
        // make the request to the koa server endpoint
    }
    handleCustomerCreate() {
        // make the request to the koa server endpoint
    }
    handleTraderLogin() {
        // make the request to the koa server endpoint
    }
    handleCustomerLogin() {
        // make the request to the koa server endpoint
    }

    constructor() {
        super(props);
        this.handleCustomerCreate = this.handleCustomerCreate.bind(this);
        this.handleTraderCreate = this.handleTraderCreate.bind(this);
        this.handleCustomerLogin = this.handleCustomerLogin.bind(this);
        this.handleTraderLogin = this.handleTraderLogin.bind(this);
    }
    render() {
        return (
            <div className='container'>
                <h1>Welcome to my gay store</h1>
                <br />
                <br />
                <div className='row'>
                    <div className='col'>
                        <div className="row">
                            <LoginSection title="Customer Login" onLogin={this.handleCustomerLogin} />
                            <div className='vr'></div>
                            <LoginSection title="Trader Login" onLogin={this.handleTraderLogin} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className='row'>
                    <div className='col'>
                        <div className="row">
                            <CreateProfileSection title="Create Customer" onCreate={this.handleCustomerCreate} />
                            <div className='vr'></div>
                            <CreateProfileSection title="Create Trader" onCreate={this.handleTraderCreate} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginScreen;