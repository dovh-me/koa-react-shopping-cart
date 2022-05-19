import React from "react";
import { Link, useNavigate } from "react-router-dom";

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/store">Store</Link >
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link >
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                {
                                    (localStorage.getItem('loginToken') && localStorage.getItem('loginToken') !== 'undefined')
                                    &&
                                    (localStorage.getItem('loginType') && localStorage.getItem('loginType') !== 'undefined')
                                    &&
                                    <Link className="nav-link" to="/logout">Logout</Link >
                                }
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}