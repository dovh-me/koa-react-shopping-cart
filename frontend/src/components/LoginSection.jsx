import React from 'react';

class LoginSection extends React.Component {
    constructor() {
        super(props);
        this.handleLogin = this.props.onLogin;
    }

    render() {
        return (
            <div className="col">
                <h3>{this.props.title}</h3>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                    </div>
                    <input type="password" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <button className="btn btn-primary">Login</button>
            </div>
        );
    }
}

export default LoginSection;