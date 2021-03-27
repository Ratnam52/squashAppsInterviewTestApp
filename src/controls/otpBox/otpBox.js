import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { content } from '../../common';
import './otpBox.css';

function OTPBox(props) {
    return (
        <div className="otpBoxClass">
            <div className='labelClass'>
                <label>{props.label}</label>
            </div>
            <div className="otpInputClass">
                <OtpInput
                    value={props.value}
                    onChange={props.onChange}
                    numInputs={5}
                />
            </div>
            <div className='resendClass'>
                <label onClick={props.reSendOTP}>{content.emailVerification_resendOtpLabel}</label>
            </div>
        </div>
    );
}

export default OTPBox;