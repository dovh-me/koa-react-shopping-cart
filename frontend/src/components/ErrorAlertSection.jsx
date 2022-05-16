import React, { Component } from 'react'
import Error from './Error';

export default class ErrorAlertSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: this.props.errorList
        };
    }

    render() {
        return (
            <div className='error-parent'>
                {this.state.errors.map((error) => <Error error={error} key={new Date().getMilliseconds()} />)}
            </div>
        )
    }
}
