import React from 'react';
import Axios from 'axios';

import LoginSection from '../components/LoginSection';
import CreateProfileSection from '../components/CreateProfileSection';
import ErrorAlertSection from '../components/ErrorAlertSection';
import { useNavigate } from 'react-router-dom';


class Login extends React.Component {
    handleTraderCreate({ username, password }) {
        // make the request to the backend endpoint
    }
    handleCustomerCreate() {
        // make the request to the backend endpoint
    }
    handleTraderLogin(data) {
        // make the request to the backend endpoint
        console.log('handleCustomerLogin fired at the Login component');
        this.login('http://localhost:9019/customers/login', data);

        if (this.state.isLoginSuccess) localStorage.setItem('loginType', 'trader');
        let navigate = useNavigate();
        navigate('/', { replace: true });
    }
    handleCustomerLogin(data) {
        // make the request to the backend endpoint
        console.log('handleCustomerLogin fired at the Login component');
        this.login('http://localhost:9019/customers/login', data);

        if (this.state.isLoginSuccess) localStorage.setItem('loginType', 'customer');
    }

    createUser(url, data) {
        Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                // save the login token in local storage
                localStorage.setItem('loginToken', data.token);
                this.props.onLoginSuccess(data.token);
            })
            .catch((error) => {
                console.log(error);
                this.setState({ errorList: [error] });
                console.log({ errorList: this.state.errorList })

            });
    }

    login(url, data) {
        console.log({ data })
        Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                // save the login token in local storage
                localStorage.setItem('loginToken', data.token);
                this.props.onLoginSuccess(data.token);
            })
            .catch((error) => {
                console.log(error);
                this.setState({ errorList: [error] });
                console.log({ errorList: this.state.errorList })

            });
    }

    constructor(props) {
        super(props);
        this.state = {
            errorList: [],
            isLoginSuccess: false
        };
        this.handleCustomerCreate = this.handleCustomerCreate.bind(this);
        this.handleTraderCreate = this.handleTraderCreate.bind(this);
        this.handleCustomerLogin = this.handleCustomerLogin.bind(this);
        this.handleTraderLogin = this.handleTraderLogin.bind(this);
        this.login = this.login.bind(this);
    }
    render() {
        return (
            <div className='container'>
                <ErrorAlertSection errorList={this.state.errorList} />
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

export default Login;