import React from 'react';

class CreateProfileSection extends React.Component {
    render() {
        return (
            <div className="col">
                <h3>{this.props.title}</h3>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Full name</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                    </div>
                    <input type="password" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <button className="btn btn-success">Create Profile</button>
            </div>
        );
    }
}

export default CreateProfileSection;