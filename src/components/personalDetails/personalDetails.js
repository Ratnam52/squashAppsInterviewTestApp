import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from 'country-state-picker';

import {
    InputBoxControl,
    ToastsStore,
    ButtonControl,
    GenderButtonControl,
    CountryStateDropdownControl,
    PhoneNumberBoxControl
} from '../../controls';
import { content, apiFunctions, apiUrls, reduxDispatchType } from '../../common';
import './personalDetails.css';


function PersonalDetails(props) {
    const reducerPersonalDetails = useSelector((state) => state.reducerPersonalDetails)
    const dispatch = useDispatch();

    const [full_name, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [dailCode, setDailCCode] = useState("+00");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isMount, setMount] = useState(true);

    useEffect(() => {
        if (isMount) {
            setMount(false)
            fetchDataFunction()
        }
    });

    const fetchDataFunction = () => {
        if (reducerPersonalDetails.data !== null && reducerPersonalDetails.data !== undefined) {
            props.changeLoaderState(true)

            apiFunctions.getFunction(
                apiUrls.personalDetailsGetByIdURL + reducerPersonalDetails.data.data._id
            ).then((response) => {
                props.changeLoaderState(false)

                if (response !== undefined) {
                    if (response.status === 200) {
                        let value = response.data.data

                        setFullName(value.full_name)
                        setGender(value.gender)
                        changeCountry(value.country)
                        setState(value.state)
                        setPhoneNumber(value.phoneNumber)
                    } else {
                        ToastsStore.warning(content.apiIssue)
                    }
                }
            })
        }
    }

    const dispatchAndTabChange = (data) => {
        dispatch({
            type: reduxDispatchType.CREATE_PERSONAL_DETAILS,
            payload: data
        })
        props.setCompanyTabDisable(false)
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
        let data = {
            full_name: full_name,
            gender: gender,
            country: country,
            state: state,
            phone_number: phoneNumber
        }

        if (reducerPersonalDetails.data !== null && reducerPersonalDetails.data !== undefined) {
            Object.assign(data, {
                _id: reducerPersonalDetails.data.data
            })

            updatDataFunction(data, apiUrls.personalDetailsUpdateURL)
        } else {
            saveDataFunction(data, apiUrls.personalDetailsAddURL)
        }
    }

    const changeCountry = (countryName) => {
        let states = getCountry(countryName);
        setCountry(countryName)
        setDailCCode(states !== null ? states.dial_code : "+00")
    }

    const isButtonDisabled = () => {
        let isDisabled = false

        if (full_name === "" || gender === "" || country === "" || state === "" || phoneNumber === "") {
            isDisabled = true
        }

        return isDisabled;
    }

    return (
        <div className="personalDetailsClass">
            <div className="headerContainer">
                <div className="header1">{content.personalDetails_header1}</div>
                <div className="header2">{content.personalDetails_header2}</div>
            </div>
            <div className="bodyContainer">
                <div className="controlFields">
                    <InputBoxControl
                        label={content.personalDetails_fullName}
                        value={full_name}
                        maxLength={50}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <GenderButtonControl
                        label={content.personalDetails_gender}
                        value={gender}
                        onChange={(val) => setGender(val)}
                    />
                    <CountryStateDropdownControl
                        label={content.personalDetails_country}
                        country={country}
                        onChange={(val) => changeCountry(val)}
                    />
                    <CountryStateDropdownControl
                        label={content.personalDetails_state}
                        country={country}
                        region={state}
                        onChange={(val) => setState(val)}
                    />
                    <PhoneNumberBoxControl
                        label={content.personalDetails_phoneNumber}
                        dail_Code={dailCode}
                        maxLength={15}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <ButtonControl
                        label={content.button_next}
                        value={full_name}
                        disabled={isButtonDisabled()}
                        onClick={nextButtonClick}
                    />
                </div>
            </div>
            <div className="footerContainer">
                <div className="footerText">
                    {content.personalDetails_footerText}
                    <span className="footerTextLogin">{content.personalDetails_footerTextLogin}</span>
                </div>
            </div>
        </div >
    );
}

export default PersonalDetails;