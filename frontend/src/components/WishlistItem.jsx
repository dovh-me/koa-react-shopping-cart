import React from 'react'

function WishlistItem(props) {
    const jumbotronStyles = {
        backgroundColor: '#eee',
        padding: '10px',
        borderRadius: '5px',
        margin: '5px 0px'
    }
    const promotionalPrice = (+props.item.price - ((+props.item.price * +props.item.promotionPtg) / 100)).toFixed(2);
    const totalPrice = (promotionalPrice * +props.item.quantity).toFixed(2);
    return (
        <div className='container'>
            <div className="card" style={jumbotronStyles}>
                <h3 className='card-title item-name'>{props.item.name}</h3>
                <div className='card-text item-qty'>Quantity: {props.item.quantity}</div>
                <div className="card-text">Price: {
                    (
                        +props.item.promotionPtg == 0 &&
                        (<span>
                            $ {(+props.item.price).toFixed(2)}
                        </span>)
                    ) ||
                    (<span>
                        <span style={{ textDecoration: 'line-through' }}>
                            $ {+props.item.price}
                        </span>
                        &nbsp;
                        <span>
                            $ {promotionalPrice}
                        </span>
                    </span>)
                }
                </div>
                <div className='card-text item-price'>Total Price: ${totalPrice}</div>
                <div>
                    <button onClick={() => props.onRemoveItem(props.item)} className="btn btn-danger">Remove Item</button>
                    <button onClick={() => props.onMoveToCart(props.item)} className="btn btn-primary">Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default WishlistItem