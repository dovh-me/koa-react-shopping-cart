import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TraderDashboard extends Component {
    render() {
        return (
            <div>
                <h3>Trader Dashboard</h3>
                <ul>
                    <li>
                        <Link to="/trader/inventory" replace>Inventory</Link>
                    </li>
                    <li>
                        <Link to="/trader/searchCustomer" replace>Search Customer</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default TraderDashboard;