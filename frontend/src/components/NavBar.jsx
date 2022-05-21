import React from "react";
import { Link } from "react-router-dom";

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('from navbar', { props: this.props })

        return (
            < div>
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">GayStore</a>
                    <div className="nav-item nav-item-custom">
                        <Link className="nav-link" to="/">Home</Link>
                    </div>
                    <div className="nav-item nav-item-custom">
                        <Link className="nav-link" to="/store">Store</Link >
                    </div>

                    {
                        this.props.isLoggedIn && this.props.loginData &&
                        (this.props.loginData.loginType === 'customer' &&
                            (
                                <React.Fragment>
                                    <div className="nav-item nav-item-custom">
                                        <Link className="nav-link" to="/wishlist">Wishlist</Link >
                                    </div>
                                    <div className="nav-item nav-item-custom">
                                        <Link className="nav-link" to="/cart">Cart</Link >
                                    </div>
                                </React.Fragment>
                            ) ||
                            (this.props.loginData.loginType === 'trader' &&
                                (
                                    <React.Fragment>
                                        <div className="nav-item nav-item-custom">
                                            <Link className="nav-link" to="/inventory">Inventory</Link >
                                        </div>
                                        <div className="nav-item nav-item-custom">
                                            <Link className="nav-link" to="/trader/searchCustomer">Search Customer</Link >
                                        </div>
                                    </React.Fragment>
                                )
                            )
                        )
                    }
                    <div className="nav-item" style={{ marginLeft: 'auto' }}>
                        {
                            (this.props.isLoggedIn &&
                                <Link className="nav-link logoutBtn" to="/logout">Logout</Link >)
                            ||
                            <Link className="nav-link loginBtn" to="/">Login</Link >
                        }
                    </div>
                </nav>
            </div >
        );
    }
}