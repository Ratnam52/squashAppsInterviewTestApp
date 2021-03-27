import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    InputBoxControl,
    ButtonControl,
    ToastsStore,
    ImageUploaderControl
} from '../../controls';
import { content, apiUrls, apiFunctions, reduxDispatchType } from '../../common';
import './companyDetails.css';

function CompanyDetails(props) {
    const reducerPersonalDetails = useSelector((state) => state.reducerPersonalDetails)
    const reducerCompanyDetails = useSelector((state) => state.reducerCompanyDetails)
    const dispatch = useDispatch();

    const [company_logo, setCompanyLogo] = useState("");
    const [company_name, setCompanyName] = useState("");
    const [email_id, setEmailId] = useState("");
    const [job_title, setJobTitle] = useState("");
    const [expireance, setExpireance] = useState("");
    const [acceptTearms, setAcceptTearms] = useState(false);
    const [isMount, setMount] = useState(true);

    useEffect(() => {
        if (isMount) {
            setMount(false)
            fetchDataFunction()
        }
    });

    const fetchDataFunction = () => {
        if (reducerCompanyDetails.data !== null && reducerCompanyDetails.data !== undefined) {
            props.changeLoaderState(true)

            apiFunctions.getFunction(
                apiUrls.companyDetailsGetByIdURL + reducerCompanyDetails.data.data._id
            ).then((response) => {
                props.changeLoaderState(false)

                if (response !== undefined) {
                    if (response.status === 200) {
                        let value = response.data.data

                        setCompanyLogo(value.company_logo)
                        setCompanyName(value.company_name)
                        setEmailId(value.email_id)
                        setJobTitle(value.job_title)
                        setExpireance(value.expireance)
                        setAcceptTearms(true)
                    } else {
                        ToastsStore.warning(content.apiIssue)
                    }
                }
            })
        }
    }

    const dispatchAndTabChange = (data) => {
        dispatch({
            type: reduxDispatchType.CREATE_COMPANY_DETAILS,
            payload: data
        })
        props.setEmailTabDisable(false)
        props.tabChange(props.currentTab + 1)
    }

    const updatDataFunction = (data, url) => {
        props.changeLoaderState(true)

        apiFunctions.putFunction(
            data,
            url
        ).then((response) => {
            props.changeLoaderState(false)

            if (response !== undefined) {
                if (response.status === 200) {
                    props.setOTPSent(false)
                    dispatchAndTabChange(response.data)
                    ToastsStore.success(content.apiUpdateSuccess)
                } else {
                    ToastsStore.warning(content.apiIssue)
                }
            } else {
                ToastsStore.warning(content.apiIssue)
            }
        })
    }

    const saveDataFunction = (data, url) => {
        props.changeLoaderState(true)

        apiFunctions.postFunction(
            data,
            url
        ).then((response) => {
            props.changeLoaderState(false)

            if (response !== undefined) {
                if (response.status === 200) {
                    dispatchAndTabChange(response.data)
                    ToastsStore.success(content.apiAddSuccess)
                } else {
                    ToastsStore.warning(content.apiIssue)
                }
            } else {
                ToastsStore.warning(content.apiIssue)
            }
        })
    }

    const nextButtonClick = () => {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (pattern.test(email_id)) {
            let data = {
                personal_details_id: reducerPersonalDetails.data.data._id,
                company_logo: company_logo,
                company_name: company_name,
                email_id: email_id,
                job_title: job_title,
                year_of_experiance: expireance
            }

            if (reducerCompanyDetails.data !== null && reducerCompanyDetails.data !== undefined) {
                Object.assign(data, {
                    _id: reducerCompanyDetails.data.data._id
                })

                updatDataFunction(data, apiUrls.companyDetailsUpdateURL)
            } else {
                saveDataFunction(data, apiUrls.companyDetailsAddURL)
            }
        } else {
            ToastsStore.error(content.invalidEmail)
        }
    }

    const isButtonDisabled = () => {
        let isDisabled = false

        if (company_logo === "" || company_name === "" || email_id === "" || job_title === "" || expireance === "" || acceptTearms === false) {
            isDisabled = true
        }

        return isDisabled;
    }

    const expireanceValidate = (val) => {
        if (val > 0 && val < 100) {
            setExpireance(val)
        } else if (val === '') {
            setExpireance(val)
        }
    }

    const backButtonClick = () => {
        props.tabChange(props.currentTab - 1);
    }

    const acceptTearmsUI = () => {
        return (
            <div className="acceptTextClass">
                <div>
                    <label className="acceptText">
                        <input type="checkbox" checked={acceptTearms} onChange={(e) => setAcceptTearms(e.target.checked)} />
                        {content.companyDetails_term1}
                        <span className="footerTextLogin">{content.companyDetails_term2}</span>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div className="companyDetailsClass">
            <div className="headerContainer">
                <div className="header1">{content.companyDetails_header1}</div>
                <div className="header2">{content.companyDetails_header2}</div>
            </div>
            <div className="bodyContainer">
                <div className="controlFields">
                    <ImageUploaderControl
                        label={content.companyDetails_imageLabel}
                        value={company_logo}
                        changeImage={(base64) => setCompanyLogo(base64)}
                    />
                    <InputBoxControl
                        label={content.companyDetails_companyName}
                        value={company_name}
                        maxLength={50}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <InputBoxControl
                        label={content.companyDetails_emailId}
                        value={email_id}
                        onChange={(e) => setEmailId(e.target.value)}
                    />
                    <InputBoxControl
                        label={content.companyDetails_jobTitle}
                        value={job_title}
                        maxLength={50}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <InputBoxControl
                        label={content.companyDetails_expireance}
                        type={"number"}
                        value={expireance}
                        onChange={(e) => expireanceValidate(e.target.value)}
                    />
                    {
                        acceptTearmsUI()
                    }
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
                                label={content.button_next}
                                disabled={isButtonDisabled()}
                                onClick={nextButtonClick}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CompanyDetails;