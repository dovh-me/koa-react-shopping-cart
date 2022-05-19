import React from 'react'

function ErrorAlert(props) {
    const errorAlert = {
        borderRadius: '10px',
        padding: '5px',
        margin: '0px 5px',
        color: 'rgb(255, 194, 196)',
        backgroundColor: 'rgb(160, 0, 0)',
    }
    return (
        <div style={errorAlert}>
            <div className='errorTitle'>
                Error!
            </div>
            <div className='errorBody'>
                {props.message}
            </div>
        </div>
    )
}

export default ErrorAlert;