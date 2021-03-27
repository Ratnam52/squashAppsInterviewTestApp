import React, { useState } from 'react';
import './inputBoxControl.css';

function InputBoxControl(props) {
    return (
        <div className="inputBox">
            <div className='labelClass'>
                <label>{props.label}</label>
            </div>
            <input
                title={'title'}
                type={props.type !== undefined ? props.type : "text"}
                maxLength={props.maxLength}
                value={props.value}
                onChange={(e) => props.onChange(e)}
            />
        </div>
    );
}

export default InputBoxControl;