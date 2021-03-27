import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { content, apiFunctions, apiUrls } from '../../common';
import {
    ToastsStore
} from '../../controls';

const SendOTP = () => {
    const reducerPersonalDetails = useSelector((state) => state.reducerPersonalDetails)
    const reducerCompanyDetails = useSelector((state) => state.reducerCompanyDetails)

    debugger
    const dispatch = useDispatch();

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
                        type: 'EMAIL_VERIFICATION',
                        payload: response.data
                    })
                } else {
                    ToastsStore.error('something went wrong')
                }
            } else {
                ToastsStore.error('something went wrong')
            }
        })
    }
}

export default SendOTP;