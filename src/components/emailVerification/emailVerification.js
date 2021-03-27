import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    OTPBox,
    ButtonControl,
    ToastsStore
} from '../../controls';
import { content, apiFunctions, apiUrls, reduxDispatchType } from '../../common';
import './emailVerification.css';


function EmailVerification(props) {
    const reducerEmailVerification = useSelector((state) => state.reducerEmailVerification)
    const reducerPersonalDetails = useSelector((state) => state.reducerPersonalDetails)
    const reducerCompanyDetails = useSelector((state) => state.reducerCompanyDetails)
    const dispatch = useDispatch();

    const [otp, setOTP] = useState("");
    const [isMount, setMount] = useState(true);

    useEffect(() => {
        if (isMount) {
            setMount(false)

            if (!props.isOTPSent)
                sendOTP()
        }
    });

    const isButtonDisabled = () => {
        let isDisabled = true

        if (otp.length === 5) {
            isDisabled = false
        }

        return isDisabled;
    }

    const verifyButtonClick = () => {
        if (reducerEmailVerification.data !== null && reducerEmailVerification.data !== undefined) {
            if (reducerEmailVerification.data.data === otp) {
                ToastsStore.success(content.otpSuccess)
            } else {
                ToastsStore.warning(content.otpFailed)
            }
        }
    }

    const backButtonClick = () => {
        props.tabChange(props.currentTab - 1);
    }

    const sendOTP = () => {
        props.setOTPSent(true)

        if (reducerPersonalDetails.data !== null
            && reducerPersonalDetails.data !== undefined &&
            reducerCompanyDetails.data !== null &&
            reducerCompanyDetails.data !== undefined
        ) {
            apiFunctions.getFunction(
                apiUrls.emailOTP + reducerPersonalDetails.data.data._id + '/' + reducerCompanyDetails.data.data._id
            ).then((response) => {

                if (response !== undefined) {
                    if (response.status === 200) {
                        dispatch({
                            type: reduxDispatchType.EMAIL_VERIFICATION,
                            payload: response.data
                        })
                    } else {
                        ToastsStore.error(content.apiIssue)
                    }
                } else {
                    ToastsStore.error(content.apiIssue)
                }
            })
        }
    }

    const getMail = () => {
        return reducerCompanyDetails.data !== null && reducerCompanyDetails.data !== undefined ? reducerCompanyDetails.data.data.email_id : ''
    }

    return (
        <div className="emailVerificationClass">
            <div className="headerContainer">
                <div className="header1">{content.emailVerification_header1}</div>
                <div className="descriptionContainer">
                    <div className="descriptionText">
                        {content.emailVerification_header2}
                        <span className="footerTextHighlight">{getMail()}</span>
                        {content.emailVerification_header3}
                    </div>
                </div>
            </div>
            <div className="bodyContainer">
                <div className="controlFields">
                    <OTPBox
                        label={content.emailVerification_otpLabel}
                        value={otp}
                        onChange={setOTP}
                        reSendOTP={sendOTP}
                    />

                    <div className="footerButtons">
                        <span className="backButtonClass">
                            <ButtonControl
                                label={content.button_back}
                                disabled={false}
                                onClick={backButtonClick}
                            />
                        </span>
                        <span className="nextButtonClass">
                            <ButtonControl
                                label={content.button_verify}
                                disabled={isButtonDisabled()}
                                onClick={verifyButtonClick}
                            />
                        </span>
                    </div>
                    <div className="borderClass"></div>
                    <div className="descriptionContainer footer">
                        <div className="descriptionText">
                            {content.emailVerification_footer}
                            <span className="footerTextHighlight">{getMail()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EmailVerification;