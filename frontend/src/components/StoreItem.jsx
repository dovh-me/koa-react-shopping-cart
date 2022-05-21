import PriceField from './PriceField';

import React, { Component } from 'react'

export class StoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
        this.handleOnAddToCart = this.handleOnAddToCart.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleOnAddToWishlist = this.handleOnAddToWishlist.bind(this);
    }

    handleQuantityChange(e) {
        e.preventDefault();
        this.setState({ quantity: +e.target.value });
    }

    handleOnAddToCart(e) {
        console.log('inside handleOnAddToCart')
        e.preventDefault();
        const itemQty = e.target.querySelector('.cart-item-quantity').value;

        if (!isNaN(+itemQty)) {
            this.props.onAddToCart({ quantity: itemQty, name: this.props.item.name });
        }
    }

    handleOnAddToWishlist(e) {
        console.log('inside handleOnAddToWishlist')
        e.preventDefault();
        this.props.onAddToWishList({ name: this.props.item.name, quantity: this.state.quantity });
    }

    render() {
        return (
            <div className="col-3" style={{ margin: '5px 0px' }}>
                <div className="card">
                    <img className="card-img-top" src="https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.item.name}</h5>
                        <p className="card-text">Available Qty: {this.props.item.quantity}</p>
                        <PriceField price={+this.props.item.price} promotionPtg={+this.props.item.promotionPtg} />
                        {
                            (
                                (this.props.isLoggedIn) &&
                                (this.props.isLoggedIn !== 'undefined') &&
                                (this.props.isLoggedIn.loginType === 'customer') &&
                                (<form onSubmit={this.handleOnAddToCart}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Quantity</span>
                                        </div>
                                        <input onChange={this.handleQuantityChange} type="number" min={1} max={this.props.item.quantity} className="form-control cart-item-quantity" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" style={{ maxWidth: '50px', minWidth: '15%' }} defaultValue={1} />
                                    </div>
                                    <button type='submit' className="btn btn-primary" disabled={this.props.item.quantity < 1}>Add To Cart</button>
                                    <button onClick={this.handleOnAddToWishlist} className="btn btn-success" disabled={this.props.item.quantity < 1}>Add To Wishlist</button>
                                    {this.props.item.quantity < 1 && (<span style={{ color: '#f00' }}>&nbsp;Out of Stock*</span>)}
                                </form>)
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default StoreItem; 