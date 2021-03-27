import { reduxDispatchType } from '../../common';

const initalState = {
    data: null
};

const emailVerificationReducer = (state = initalState, action) => {
    const { type, payload } = action;

    switch (type) {
        case reduxDispatchType.EMAIL_VERIFICATION:
            return {
                data: payload
            }

        default:
            return state;
    }

    return state;
}

export default emailVerificationReducer;