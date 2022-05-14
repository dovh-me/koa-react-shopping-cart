import React from 'react';

class CreateProfileSection extends React.Component {
    render() {
        return (
            <div className="col">
                <h3>{this.props.title}</h3>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Full name</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
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
                <button className="btn btn-success">Create Profile</button>
            </div>
        );
    }
}

export default CreateProfileSection;