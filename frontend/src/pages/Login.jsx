import React from 'react';
import Axios from 'axios';

import LoginSection from '../components/LoginSection';
import CreateProfileSection from '../components/CreateProfileSection';
import AlertSection from '../components/AlertSection';
import { Navigate } from 'react-router-dom';


class Login extends React.Component {
    handleTraderCreate(data) {
        // make the request to the backend endpoint
        this.createUser('http://localhost:9019/traders/create', data);
    }
    handleCustomerCreate(data) {
        // make the request to the backend endpoint
        this.createUser('http://localhost:9019/customers/create', data);
    }
    handleTraderLogin(data) {
        // make the request to the backend endpoint
        this.login('http://localhost:9019/traders/login', data, 'trader');
    }
    handleCustomerLogin(data) {
        // make the request to the backend endpoint
        this.login('http://localhost:9019/customers/login', data, 'customer');
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    createUser(url, data) {
        Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                const message = 'User created successfully!'
                this.setState((state) => ({
                    successList: [...state.successList, message]
                }));
            })
            .catch((error) => {
                console.log(error);
                this.setState((state) => ({
                    errorList: [...state.errorList, error.message],
                    isLoginSuccess: false,
                }));
                console.log('There was an error creating the user');
            });
    }

    login(url, data, loginType) {
        console.log({ data })
        Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                const { data } = response;
                // save the login token in local storage
                localStorage.setItem('loginToken', data.token);

                this.setState({ isLoginSuccess: true });
                this.onLoginSuccess({ loginToken: data.token, loginType });
            })
            .catch((error) => {
                console.log(error);

                this.setState((state) => ({
                    errorList: [...state.errorList, error.message]
                }));
                this.setState({ isLoginSuccess: false });
                console.log('There was an error logging in')
            });
    }

    onLoginSuccess(data) {
        localStorage.setItem('loginToken', data.loginToken);
        localStorage.setItem('loginType', data.loginType);
        this.props.onLoginSuccess(data);
    }

    constructor(props) {
        super(props);
        this.state = {
            errorList: [],
            successList: [],
            isLoginSuccess: false
        };
        this.handleCustomerCreate = this.handleCustomerCreate.bind(this);
        this.handleTraderCreate = this.handleTraderCreate.bind(this);
        this.handleCustomerLogin = this.handleCustomerLogin.bind(this);
        this.handleTraderLogin = this.handleTraderLogin.bind(this);
        this.login = this.login.bind(this);
        this.createUser = this.createUser.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
    }

    render() {
        if (!this.props.isLoginSuccess)
            return (
                <div className='container'>
                    <AlertSection errorList={this.state.errorList} successList={this.state.successList} />
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
                                <CreateProfileSection title="Create Customer" onUserCreate={this.handleCustomerCreate} />
                                <div className='vr'></div>
                                <CreateProfileSection title="Create Trader" onUserCreate={this.handleTraderCreate} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <Navigate to="/home" replace />
            );
    }
}

export default Login;