import React from 'react'

class Error extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div style={{ backgroundColor: '#f00', color: '#fff' }}>
                <div className='errorTitle'>
                    Error!
                </div>
                <div className='errorBody'>
                    {this.props.error.message}
                </div>
            </div>
        )
    }
}

export default Error