import React from 'react'

function CustomerProfile(props) {
    return (
        <div className='card'>
            <div className="card-body">
                <h3 className="card-title">{props.customer.username}</h3>
                <br />
                <div className="card-text">{props.customer.email}</div>
                <div className="card-text">{props.customer.dateJoined}</div>
            </div>
        </div>
    )
}

export default CustomerProfile