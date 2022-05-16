import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: undefined
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        console.log('inside handle logout function')
        localStorage.removeItem('loginToken');
        localStorage.removeItem('loginType');
        console.log({ loginToken: localStorage.removeItem('loginToken'), loginType: localStorage.removeItem('loginType') })
        if ((!localStorage.getItem('loginToken')) && (!localStorage.getItem('loginType')))
            this.setState({ message: 'Logout success!' });
        return true;
    }

    componentDidMount() {
        this.handleLogout();
    }
    render() {
        return (
            <div>
                <div>Logout</div>
                {this.state.message && <Navigate to="/" replace={true} />}
            </div>
        )
    }
}
