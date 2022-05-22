import React from 'react';
import StoreItem from '../components/storeItem';
import Axios from '../axios';
import AlertSection from '../components/AlertSection';

class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeItems: [],
            successList: [],
            errorList: []
        }
        this.fetchStoreItems = this.fetchStoreItems.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleAddToWishlist = this.handleAddToWishlist.bind(this);
    }

    componentDidMount() {
        this.fetchStoreItems();
    }

    fetchStoreItems() {
        console.log(this.props);

        Axios.get('/item/getAll').then((response) => {
            const { data } = response;
            console.log({ data });
            this.setState({
                storeItems: data.allItems
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleAddToCart(data) {
        Axios.post('/cart/addItem', data).then((response) => {
            const { data } = response;
            console.log({ data });
            this.setState((state) => ({
                successList: [...state.successList, data.message]
            }));
        }).catch((error) => {
            console.log(error);
            this.setState((state) => ({
                errorList: [...state.errorList, data.error]
            }));
        });
    }
    handleAddToWishlist(data) {
        Axios.post('/wishlist/addItem', { item: data }).then((response) => {
            const { data } = response;
            console.log({ data });
            this.setState((state) => ({
                successList: [...state.successList, data.message]
            }));
        }).catch((error) => {
            console.log(error);
            this.setState((state) => ({
                errorList: [...state.errorList, data.error]
            }));
        });
    }

    render() {
        if (this.state.storeItems.length)
            return (
                <div>
                    <AlertSection successList={this.state.successList} errorList={this.state.errorList} />
                    <div style={{ margin: '5px 0px' }} className="row" >
                        {this.state.storeItems.map((item, index) => <StoreItem item={item} key={index} isLoggedIn={this.props.loginData} onAddToCart={this.handleAddToCart} onAddToWishList={this.handleAddToWishlist} />)}
                    </div>
                </div>
            )
    }
}

export default Store;