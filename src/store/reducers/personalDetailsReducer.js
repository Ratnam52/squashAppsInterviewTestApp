import { reduxDispatchType } from '../../common';

const initalState = {
    data: null
};

const personalDetailsReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {
        case reduxDispatchType.CREATE_PERSONAL_DETAILS:
            return {
                data: payload
            }

        default:
            return state;
    }

    return state;
}

export default personalDetailsReducer;