import React, { useState } from 'react'
import LoginSection from '../components/LoginSection';
import CreateProfileSection from '../components/CreateProfileSection';

function Welcome() {
    const [errorList, setErrorList] = useState([]);
    const [successList, setSuccessList] = useState([]);
    const [appLoginType, setAppLoginType] = useState('customer');
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const handleTraderCreate = (data) => {
        // make the request to the backend endpoint
        createUser('http://localhost:9019/traders/create', data);
    }
    const handleCustomerCreate = (data) => {
        // make the request to the backend endpoint
        createUser('http://localhost:9019/customers/create', data);
    }
    const handleTraderLogin = (data) => {
        // make the request to the backend endpoint
        login('http://localhost:9019/traders/login', data, 'trader');
    }
    const handleCustomerLogin = (data) => {
        // make the request to the backend endpoint
        login('http://localhost:9019/customers/login', data, 'customer');
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

                setIsLoginSuccess(tue)
                this.onLoginSuccess({ loginToken: data.token, loginType });
            })
            .catch((error) => {
                console.log(error);

                setErrorList([...errorList, error.message]);
                this.setState({ isLoginSuccess: false });
                console.log('There was an error logging in')
            });
    }

    const onLoginSuccess = (data) => {
        localStorage.setItem('loginToken', data.loginToken);
        localStorage.setItem('loginType', data.loginType);
        this.props.onLoginSuccess(data);
    }

    return (
        <div className="container">
            <div></div>
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
        </div>
    )
}

export default Welcome