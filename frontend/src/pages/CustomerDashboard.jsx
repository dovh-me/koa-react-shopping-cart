import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CustomerDashboard extends Component {
    render() {
        return (
            <div>
                <h3>Customer Dashboard</h3>
                <ul>
                    <li>
                        <Link to="/customer/cart" replace>Cart</Link>
                    </li>
                    <li>
                        <Link to="/customer/wishlist" replace>Wishlist</Link>
                    </li>
                    <li>
                        <Link to="/customer/store" replace>Store</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CustomerDashboard;