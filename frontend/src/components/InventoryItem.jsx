import React from 'react'

function InventoryItem(props) {
    console.log('promotional price', (+props.item.promotionalPtg === 0 && ('--')) ||
        ((+props.item.price - ((+props.item.price * +props.item.promotionPtg) / 100)).toFixed(2)))
    return (
        <div className="col-3" style={{ margin: '5px 0px' }}>
            <div className='card'>
                <div className="card-body">
                    <h5 className="card-title">{props.item.name}</h5>
                    <p className="card-text">Available Quantity: {props.item.quantity}</p>
                    <p className='card-text'>Original Price: ${(+props.item.price).toFixed(2)}</p>
                    <p className="card-text">Promotion Percentage: {props.item.promotionPtg}%</p>
                    <p className="card-text">Promotional Price: ${
                        (+props.item.promotionalPtg === 0 && ('--')) ||
                        ((+props.item.price - ((+props.item.price * +props.item.promotionPtg) / 100)).toFixed(2))
                    }</p>
                </div>
            </div>
        </div>
    )
}

export default InventoryItem