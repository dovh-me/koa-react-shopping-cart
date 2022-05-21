import React from 'react'
import { Navigate } from 'react-router-dom';
import CustomerDashboard from './CustomerDashboard';
import TraderDashboard from './TraderDashboard';

function Home(props) {
    if (props.isLoggedIn) {
        if (props.loginData.loginType === 'customer') {
            return (
                <CustomerDashboard loginData={props.loginData} />
            );
        } else if (props.loginData.loginType === 'trader') {
            return (
                <TraderDashboard loginData={props.loginData} />
            );
        }
    }
    else {
        return (
            <div>
                Please login before entering this page!
                <Navigate to='/' replace />
            </div>
        )
    }
}

export default Home