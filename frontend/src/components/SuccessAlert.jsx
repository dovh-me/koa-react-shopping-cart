import React from 'react'
import styles from '../../styles/alert.module.css';

function Error(props) {
    const successAlert = {
        borderRadius: '10px',
        padding: '5px',
        margin: '0px 5px',
        color: 'rgb(196, 255, 194)',
        backgroundColor: 'rgb(0, 160, 0)',
    }
    return (
        <div style={successAlert}>
            <div className='alertTitle'>
                Success!
            </div>
            <div className='alertBody'>
                {props.message}
            </div>
        </div>
    )
}

export default Error