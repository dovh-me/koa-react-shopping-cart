import React from 'react';

class CreateProfileSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateProfile = this.handleCreateProfile.bind(this);
    }

    handleCreateProfile(e) {
        e.preventDefault();
        // the full name is ignored for now
        // todo: add full name as a user property in the back end or remove from the front end
        const email = e.target.querySelector('.email-input').value;
        const username = e.target.querySelector('.username-input').value;
        const password = e.target.querySelector('.password-input').value;
        console.log({ username, password, email });
        this.props.onUserCreate({ username, password, email });
    }

    render() {
        return (
            <div className="col">
                <form onSubmit={this.handleCreateProfile}>
                    <h3>{this.props.title}</h3>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                        </div>
                        <input type="text" className="form-control email-input" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Full name</span>
                        </div>
                        <input type="text" className="form-control full-name-input" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                        </div>
                        <input type="text" className="form-control username-input" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        </div>
                        <input type="password" className="form-control password-input" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <button className="btn btn-success" type='submit'>Create Profile</button>
                </form >
            </div>
        );
    }
}

export default CreateProfileSection;