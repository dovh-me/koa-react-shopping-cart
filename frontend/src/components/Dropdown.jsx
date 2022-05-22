import React, { useState } from 'react'
import '../../styles/dropdown.css';

function Dropdown(props) {
    const [dropdownOptions, setDropdownOptions] = useState();
    const [selectedOption, setSelectedOption] = useState(0);
    const [displayOptions, setDisplayOptions] = useState(false);

    const onOptionSelect = function (index, e) {
        e.preventDefault();
        setSelectedOption(index);
        toggleDropdown();
        props.onOptionSelect(props.options[index]);
    }

    const toggleDropdown = function () {
        setDisplayOptions(!displayOptions)
    }

    // ** styles **
    const dropdownOptionSelected = {
        backgroundColor: '#ddd',
        color: '#000'
    }

    const dropdownOverlayDisplay = {
        top: '0',
        left: '0',
        display: 'block',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        zIndex: '1'
    }

    const dropdownOverlayHide = {
        display: 'none'
    }

    const dropdownOptionsDisplay = {
        display: 'block',
        position: 'absolute',
        height: 'auto',
        width: '50px',
        zIndex: '1',
        backgroundColor: '#eee',
        borderRadius: '5px',
        padding: '2px'
    }

    const dropdownOptionsHide = {
        display: 'none'
    }

    return (
        <div className='dropdown-custom' style={{ display: 'inline-block' }}>
            <button onClick={toggleDropdown} className="btn btn-success dropdown-toggle">{props.options[selectedOption].text}</button>
            <div className='dropdown-overlay' onClick={toggleDropdown} style={displayOptions ? dropdownOverlayDisplay : dropdownOverlayHide}></div>
            <div className="options" style={displayOptions ? dropdownOptionsDisplay : dropdownOptionsHide}>
                {props.options.map((option, index) =>
                    <div className='option' onClick={onOptionSelect.bind(null, index)} key={index} style={index === selectedOption ? dropdownOptionSelected : {}}>{option.text}</div>
                )}
            </div>
        </div>
    )
}

export default Dropdown