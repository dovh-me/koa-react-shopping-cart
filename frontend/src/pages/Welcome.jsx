import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import LoginSection from '../components/LoginSection';
import CreateProfileSection from '../components/CreateProfileSection';
import Dropdown from '../components/Dropdown';
import AlertSection from '../components/AlertSection';
import Axios from '../axios';

function Welcome(props) {
    const [errorList, setErrorList] = useState([]);
    const [successList, setSuccessList] = useState([]);
    const [appLoginType, setAppLoginType] = useState('customer');
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const handleTraderCreate = (data) => {
        // make the request to the backend endpoint
        createUser('/traders/create', data);
    }
    const handleCustomerCreate = (data) => {
        // make the request to the backend endpoint
        createUser('/customers/create', data);
    }
    const handleTraderLogin = (data) => {
        // make the request to the backend endpoint
        login('/traders/login', data, 'trader');
    }
    const handleCustomerLogin = (data) => {
        // make the request to the backend endpoint
        login('/customers/login', data, 'customer');
    }

    const createUser = (url, data) => {
        Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                const message = 'User created successfully!'
                setSuccessList([...successList, message]);
            })
            .catch((error) => {
                console.log(error);
                setErrorList([...errorList, error.message]);
                console.log('There was an error creating the user');
            });
    }

    const login = (url, data, loginType) => {
        console.log({ data })
        Axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                const { data } = response;
                // save the login token in local storage
                localStorage.setItem('loginToken', data.token);

                setIsLoginSuccess(true);
                setSuccessList([...successList, 'User logged in successfully'])
                onLoginSuccess({ loginToken: data.token, loginType, data });
            })
            .catch((error) => {
                console.log(error);

                setErrorList([...errorList, error.message]);
                setIsLoginSuccess(false)
                console.log('There was an error logging in')
            });
    }

    const onLoginSuccess = (data) => {
        localStorage.setItem('loginToken', data.loginToken);
        localStorage.setItem('loginType', data.loginType);
        props.onLoginSuccess(data);
    }
    if (!props.isLoginSuccess)
        return (
            <div className="container">
                <AlertSection errorList={errorList} successList={successList} />
                <div className='loginDropdown' style={{ margin: '5px' }}>
                    <h4>
                        I am here to &nbsp;
                        <Dropdown options={[{ text: 'Buy', value: 'customer' }, { text: 'Sell', value: 'trader' }]} onOptionSelect={(option) => { setAppLoginType(option.value) }} />
                        &nbsp; stuff
                    </h4>
                </div>
                {
                    appLoginType === 'customer' ?
                        <div className='d-flex p-2 flex-column' style={{ marginTop: 'auto' }}>
                            <div className="card">
                                <div className="card-body">
                                    <LoginSection title="Login" onLogin={handleCustomerLogin} />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <CreateProfileSection title="Create Customer" onUserCreate={handleCustomerCreate} />
                                </div>
                            </div>
                        </div>
                        :
                        <div className='d-flex p-2 flex-column' style={{ marginTop: 'auto' }}>
                            <div className="card">
                                <div className="card-body">
                                    <LoginSection title="Login" onLogin={handleTraderLogin} />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <CreateProfileSection title="Create Trader" onUserCreate={handleTraderCreate} />
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    else
        return (
            <Navigate to="/home" replace />
        );
}

export default Welcome