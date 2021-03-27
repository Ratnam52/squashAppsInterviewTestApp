import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { indiaFlag } from '../../assets'
import { content } from '../../common';
import './countryStateDropdownControl.css';

function CountryStateDropdownControl(props) {
    return (
        <div className="dropDownClassClass">
            <div className='labelClass'>
                <label>{props.label}</label>
            </div>
            {
                props.label === "Country" ?
                    <div className='imgBlock'>
                        <div className='imgText'>
                            <img src={indiaFlag} color={"#ffffff"} height={"15px"} width={"15px"}></img>
                        </div>
                        <CountryDropdown
                            value={props.country}
                            onChange={(val) => props.onChange(val)}
                            defaultOptionLabel={content.personalDetails_countryLabel} />
                    </div>
                    :
                    <RegionDropdown
                        country={props.country}
                        value={props.region}
                        onChange={(val) => props.onChange(val)}
                        defaultOptionLabel={content.personalDetails_stateLabel} />
            }
        </div>
    );
}

export default CountryStateDropdownControl;