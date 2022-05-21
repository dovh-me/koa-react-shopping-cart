import Axios from 'axios';
import React, { useState } from 'react'
import CustomerProfile from '../components/customerProfile';

export default function SearchCustomer(props) {
    const [customerSearchValue, setCustomerSearchValue] = useState('');
    const [customer, setCustomer] = useState();
    const [errorList, setErrorList] = useState([]);

    const handleCustomerSearchChange = function (e) {
        e.preventDefault();
        setCustomerSearchValue(e.target.value);
    }

    const handleOnSearch = function (e) {
        e.preventDefault();
        Axios.get(`http://localhost:9019/customers/get/${customerSearchValue}`, {
            headers: {
                authorization: `Bearer ${props.loginData.loginToken}`
            }
        }).then((response) => {
            const { customer } = response.data;
            setCustomer(customer);
            console.log({ response })
        }).catch((error) => {
            console.log(error);
            setErrorList(errorList.push(error));
        })
    }

    return (
        <div>
            <div style={{ margin: 'auto' }}>
                <div className="alert alert-warning">
                    Doesn't make sense to me. I think I got the requirement wrong 😔
                </div>
            </div>
            <div className="container" style={{ marginTop: '20px' }}>
                <div className='card'>
                    <div className="card-body">
                        <h3 className="card-heading">Search Customer</h3>
                        <form onSubmit={handleOnSearch}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Customer Username</span>
                                </div>
                                <input onChange={handleCustomerSearchChange} type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id='username' />
                            </div>
                            <button type="submit" className="btn btn-primary">Search Customer</button>
                        </form>
                    </div>
                </div>
                <div>
                    {customer && <CustomerProfile customer={customer} />}
                </div>
            </div>
        </div>
    )
}