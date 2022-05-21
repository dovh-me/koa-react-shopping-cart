import React, { Component } from 'react';
import Axios from 'axios';
import AddItemSection from '../components/AddItemSection';
import AddPromotionSection from '../components/AddPromotionSection';
import InventoryItem from '../components/InventoryItem';
import RemoveItemSection from '../components/RemoveItemSection';

export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInventory: []
        }

        this.fetchInventory = this.fetchInventory.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handlePromotion = this.handlePromotion.bind(this);

        this.fetchInventory();
    }

    componentDidMount() {
        this.fetchInventory();
    }

    fetchInventory() {
        console.log(this.props)
        if (!this.props.loginData) return;

        Axios.get('http://localhost:9019/traders/inventory',
            {
                headers: {
                    authorization: `Bearer ${this.props.loginData.loginToken}`
                }
            }).then((response) => {
                const { data } = response;
                console.log({ data });
                this.setState({
                    userInventory: data.inventory
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    handleAddItem(data) {
        Axios.post('http://localhost:9019/item/create', data, {
            headers: {
                authorization: `Bearer ${this.props.loginData.loginToken}`
            }
        }).then((response) => {
            const { data } = response;
            console.log({ data });
            this.setState({
                userInventory: data.inventory
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handleRemoveItem(itemName) {
        Axios.delete(`http://localhost:9019/item/delete/${itemName}`, {
            headers: {
                authorization: `Bearer ${this.props.loginData.loginToken}`
            }
        }).then((response) => {
            const { data } = response;
            console.log({ data });
            this.setState({
                userInventory: data.inventory
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    handlePromotion(formData) {
        const itemName = formData.name;
        delete formData.name;
        Axios.patch(`http://localhost:9019/item/update/${itemName}`, formData, {
            headers: {
                authorization: `Bearer ${this.props.loginData.loginToken}`
            }
        }).then((response) => {
            const { data } = response;
            console.log({ data });
            this.setState({
                userInventory: data.inventory
            });
        }).catch((error) => {
            console.log(error);
        });
    }


    render() {
        if (this.props.loginData)
            return (
                <div className='container'>
                    <div className="jumbotron">
                        <div style={{ margin: '5px 0px' }}>
                            <AddItemSection onSubmit={this.handleAddItem} />
                        </div>
                        <div style={{ margin: '5px 0px' }}>
                            <RemoveItemSection onSubmit={this.handleRemoveItem} />
                        </div>
                        <div style={{ margin: '5px 0px' }}>
                            <AddPromotionSection onSubmit={this.handlePromotion} />
                        </div>
                        <hr />
                        <div style={{ margin: '5px 0px' }} className="row" >
                            <h3>Inventory Items</h3>
                            {this.state.userInventory.map((inventoryItem, index) => <InventoryItem item={inventoryItem} key={index} />)}
                        </div>
                    </div>
                </div>
            )
    }
}