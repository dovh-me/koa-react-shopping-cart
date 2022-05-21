import React, { Component } from 'react'

export default class RemoveItemSection extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const itemName = e.target.querySelector('.remove-item-input').value;
        if (itemName && itemName.length)
            this.props.onSubmit(itemName);
    }

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <div className='jumbotron'>
                    <div className="card">
                        <div className="card-header">
                            Remove Item
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Item Name</span>
                                </div>
                                <input type="text" className="form-control remove-item-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <button className='btn btn-danger' type='submit'>Remove Item</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}