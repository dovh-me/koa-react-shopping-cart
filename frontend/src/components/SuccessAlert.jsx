import React from 'react'

function Error(props) {
    return (
        <div className="alert alert-success">
            <div className='alert-heading'>
                Success!
            </div>
            <div className='errorBody'>
                {props.message}
            </div>
        </div>
    )
}

export default Error