import React, { useState } from 'react';
import './phoneNumberBoxControl.css';
import { indiaFlag } from '../../assets'

function PhoneNumberBoxControl(props) {
    return (
        <div className="phoneNumberBox">
            <div className='labelClass'>
                <label>{props.label}</label>
            </div>
            <div className='imgBlock'>
                <div className='imgText'>
                    <img src={indiaFlag} color={"#ffffff"} height={"15px"} width={"15px"}></img>
                    {props.dail_Code}
                </div>
                <input
                    title={props.label}
                    type={"number"}
                    maxLength={props.maxLength}
                    value={props.value}
                    onChange={(e) => props.onChange(e)}
                />
            </div>
        </div>
    );
}

export default PhoneNumberBoxControl;