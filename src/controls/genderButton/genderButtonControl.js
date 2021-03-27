import React, { useState, useEffect } from 'react';
import { content } from '../../common';
import './genderButtonControl.css';

function GenderButtonControl(props) {

    const [gender, setGender] = useState("");
    const [genderArray, setGenderArray] = useState(['Male', 'Female', 'Others']);

    useEffect(() => {
        setGender(props.value)
    });

    const saveFunction = (value) => {
        setGender(value);
        props.onChange(value);
    }

    return (
        <div className="genderButtonClass">
            <div className='labelClass'>
                <label>{props.label}</label>
            </div>

            <button
                className={gender === genderArray[0] ? "genderSelect" : "genderUnSelect"}
                onClick={() => saveFunction(genderArray[0])}
            >
                <span className="btnText">{content.gender_male}</span>
            </button>

            <button
                className={gender === genderArray[1] ? "genderSelect" : "genderUnSelect"}
                onClick={() => saveFunction(genderArray[1])}
            >
                <span className="btnText">{content.gender_female}</span>
            </button>

            <button
                className={gender === genderArray[2] ? "genderSelect" : "genderUnSelect "}
                onClick={() => saveFunction(genderArray[2])}
            >
                <span className="btnText">{content.gender_others}</span>
            </button>
        </div>
    );
}

export default GenderButtonControl;