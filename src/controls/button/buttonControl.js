import React, { useState } from 'react';
import './buttonControl.css';

function ButtonControl(props) {
    return (
        <div className="buttonClass">
            <button
                onClick={() => props.onClick()}
                disabled={props.disabled}
            >
                <span className="btnText">{props.label}</span>
            </button>
        </div>
    );
}

export default ButtonControl;