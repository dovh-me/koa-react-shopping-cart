import React from 'react'

function ErrorAlert(props) {
    return (
        <div className="alert alert-danger">
            <div className='alert-heading'>
                Error!
            </div>
            <div className='errorBody'>
                {props.message}
            </div>
        </div>
    )
}

export default ErrorAlert;