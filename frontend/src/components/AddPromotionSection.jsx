import React, { Component } from 'react'

export default class AddPromotionSection extends Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleOnSubmit(e) {
        e.preventDefault();
        const name = e.target.querySelector('.promotion-item-name-input').value;
        const promotionPtg = e.target.querySelector('.promotion-item-promotionPtg-input').value;
        if ((name && name.length) && (promotionPtg && (+promotionPtg !== NaN)))
            this.props.onSubmit({ name, promotionPtg });
    }

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <div className='jumbotron'>
                    <div className="card">
                        <div className="card-header">
                            Add Item Promotion
                        </div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Item Name</span>
                                </div>
                                <input type="text" className="form-control promotion-item-name-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Promotion Percentage</span>
                                </div>
                                <input type="text" className="form-control promotion-item-promotionPtg-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <button className='btn btn-success' type='submit'>Add Promotion</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}