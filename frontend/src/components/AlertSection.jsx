import React, { Component } from 'react'
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

export default class AlertSection extends Component {
    constructor(props) {
        super(props);
        console.log('props from AlertSection', this.props)
    }

    render() {
        return (
            <div className='alert-parent'>
                {this.props.errorList.map((message) => <ErrorAlert message={message} key={new Date().getMilliseconds()} />)}
                {this.props.successList.map((message) => <SuccessAlert message={message} key={new Date().getMilliseconds()} />)}
            </div>
        )
    }
}
