import * as AuthTypes from '../constants/AuthTypes';
import createReducer from '../lib/createReducer';

const defaultState = {
  isAuthenticated: null,
  error: null,
  accessToken: null,
};

// TODO: STATE NOT BEING SENT TO COMPONENTS

function SESSION_SIGN_IN_SUCCESS(state, action) {
  console.log('inside of success');
  console.log(action);

	return {
		...state,
    isAuthenticated: action.payload.isAuthenticated,
    accessToken: action.payload.token,
    error: null,
	};
}

function SESSION_SIGN_IN_FAILED(state, action) {
    console.log('inside of failed');
  return {
    ...state,
    isAuthenticated: action.payload.isAuthenticated,
    error: action.payload.response,
  };
}

const handlers = {};
handlers[AuthTypes.SESSION_SIGN_IN_SUCCESS] = SESSION_SIGN_IN_SUCCESS;
handlers[AuthTypes.SESSION_SIGN_IN_FAILED] = SESSION_SIGN_IN_FAILED;

export default createReducer(defaultState, handlers);
