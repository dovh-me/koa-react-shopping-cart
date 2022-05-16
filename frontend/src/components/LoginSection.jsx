import React from 'react';

class LoginSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLoginRaw.bind(this);
    }

    handleLoginRaw(e) {
        e.preventDefault();
        // get the username
        const username = e.target.querySelector('#username').value;
        const password = e.target.querySelector('#password').value;
        console.log({ username, password })
        this.props.onLogin({ username, password });
    }

    render() {
        return (
            <div className="col">
                <h3>{this.props.title}</h3>
                <form onSubmit={this.handleLogin}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id='username' />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        </div>
                        <input type="password" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id='password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginSection;