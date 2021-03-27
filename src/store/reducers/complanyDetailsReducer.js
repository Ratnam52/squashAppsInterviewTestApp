import { reduxDispatchType } from '../../common';

const initalState = {
    data: null
};

const companyDetailsReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {
        case reduxDispatchType.CREATE_COMPANY_DETAILS:
            return {
                data: payload
            }

        default:
            return state;
    }

    return state;
}

export default companyDetailsReducer;