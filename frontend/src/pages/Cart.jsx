import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Axios from '../axios';
import CartItem from '../components/CartItem';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCart: []
        }
        this.fetchUserCart = this.fetchUserCart.bind(this);
        this.handlePurchaseItem = this.handlePurchaseItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    fetchUserCart() {
        console.log(this.props)
        if (!this.props.loginData) return;

        Axios.get('/cart/viewAll',
            {
                headers: {
                    authorization: `Bearer ${this.props.loginData.loginToken}`
                }
            }).then((response) => {
                const { data } = response;
                console.log({ data });
                const cart = data.cart;
                console.log({ cart })
                this.setState({
                    userCart: cart
                });
            }).catch((error) => {
                console.log(error);
            })
    }

    handleRemoveItem(item) {
        Axios.post(`/cart/removeItem`, item, {
            headers: {
                authorization: `Bearer ${this.props.loginData.loginToken}`
            }
        }).then((response) => {
            const { data } = response;
            console.log('handleRemoveItem', { data }, { state: this.state });
            this.setState({
                userCart: data.cart
            });
        }).catch((error) => {
            console.log(error)
        });
    }

    handlePurchaseItem(item) {
        Axios.post(`/cart/purchase`, { items: [item] }, {
            headers: {
                authorization: `Bearer ${this.props.loginData.loginToken}`
            }
        }).then((response) => {
            const { data } = response;
            this.setState({ userCart: data.cart });
        }).catch((error) => {
            console.log(error)
        });
    }

    componentDidMount() {
        this.fetchUserCart();
    }

    render() {
        if (!this.props.loginData)
            return (
                <Navigate to='/' replace />
            );
        else
            if (this.state.userCart instanceof Array && this.state.userCart.length) {
                return (
                    <div className='container'>
                        <h2>View Cart</h2>
                        {this.state.userCart.map((item, index) => <CartItem key={index} onRemoveItem={this.handleRemoveItem} onPurchaseItem={this.handlePurchaseItem} item={item} />)}
                    </div>
                );
            } else {
                return (
                    <div>Your cart is empty! Visit <Link to="/store">store</Link> to add items to your cart</div>
                )
            }
    }
}

export default Cart;