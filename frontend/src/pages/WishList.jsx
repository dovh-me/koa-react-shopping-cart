import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import WishlistItem from '../components/WishlistItem';

import Axios from '../axios';

class WishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userWishlist: []
        }
        this.fetchUserCart = this.fetchUserWishlist.bind(this);
        this.handleMoveToCart = this.handleMoveToCart.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    fetchUserWishlist() {
        console.log(this.props)
        if (!this.props.loginData) return;

        Axios.get('/wishlist/viewAll').then((response) => {
            const { data } = response;
            console.log({ data });
            const wishlist = data.wishlist;
            console.log({ cart: wishlist })
            this.setState({
                userWishlist: wishlist
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    handleRemoveItem(item) {
        Axios.post(`/wishlist/removeItem`, { item }).then((response) => {
            const { data } = response;
            console.log('handleRemoveItem', { data }, { state: this.state });
            this.setState({
                userWishlist: data.cart
            });
        }).catch((error) => {
            console.log(error)
        });
    }

    handleMoveToCart(item) {
        Axios.post(`/wishlist/moveToCart`, { item }).then((response) => {
            console.log('setting new wishlist state for update')
            this.setState({
                userWishlist: response.data.wishlist
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.fetchUserWishlist();
    }

    render() {
        if (!this.props.loginData)
            return (
                <Navigate to='/' replace />
            );
        else
            if (this.state.userWishlist instanceof Array && this.state.userWishlist.length) {
                return (
                    <div className='container'>
                        <h2>View Wishlist</h2>
                        {this.state.userWishlist.map((item, index) => <WishlistItem key={index} onRemoveItem={this.handleRemoveItem} onMoveToCart={this.handleMoveToCart} item={item} />)}
                    </div>
                );
            } else {
                return (
                    <div>Your wishlist is empty! Visit <Link to="/store">store</Link> to add items to your cart</div>
                )
            }
    }
}

export default WishList;