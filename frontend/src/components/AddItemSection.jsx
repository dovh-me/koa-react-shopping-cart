import React, { Component } from 'react'

export default class AddItemSection extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const name = e.target.querySelector('.add-item-name-input').value;
        const quantity = e.target.querySelector('.add-item-availableQuantity-input').value;
        const price = e.target.querySelector('.add-item-price-input').value;
        const promotionPtg = e.target.querySelector('.add-item-promotionPtg-input').value;
        if (name)
            this.props.onSubmit({ name, quantity, price, promotionPtg });
    }

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <div className='jumbotron'>
                    <div className="card">
                        <div className="card-header">
                            Add Item
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Item Name</span>
                                </div>
                                <input type="text" className="form-control add-item-name-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Available Qty</span>
                                </div>
                                <input type="text" className="form-control add-item-availableQuantity-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Price $</span>
                                </div>
                                <input type="text" className="form-control add-item-price-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Promotion %</span>
                                </div>
                                <input type="number" min={0} max={100} className="form-control add-item-promotionPtg-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" defaultValue="0" />
                            </div>
                            <button className='btn btn-primary' type='submit'>Add Item</button>
                        </div>
                    </div>

                </div>
            </form>
        )
    }
}