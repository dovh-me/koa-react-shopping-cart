import React from 'react'

function PriceField(props) {
    const isNum = !isNaN(props.promotionPtg)
    if (isNum && props.promotionPtg > 0)
        return (
            <div>
                <span>Price: $ </span>
                <span style={{ textDecoration: 'line-through' }}>{props.price.toFixed(2)}</span>
                &nbsp;
                <span>{(props.price - (props.price * props.promotionPtg) / 100).toFixed(2)}</span>
            </div>
        );
    else
        return (
            <div>
                <span>Price: $ </span>
                <span>{props.price.toFixed(2)}</span>
            </div>
        )
}

export default PriceField