import { combineReducers } from 'redux';
import {
    personalDetailsReducer,
    complanyDetailsReducer,
    emailVerificarionReducer
} from './reducers';

const rootReducer = combineReducers({
    reducerPersonalDetails: personalDetailsReducer,
    reducerCompanyDetails: complanyDetailsReducer,
    reducerEmailVerification: emailVerificarionReducer,
})

export default rootReducer;