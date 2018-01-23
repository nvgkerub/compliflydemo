import * as AuthTypes from '../constants/AuthTypes';
import createReducer from '../lib/createReducer';

const defaultState = {
  isAuthenticated: null,
  error: null,
  accessToken: null,
  language: null,
};

// TODO: STATE NOT BEING SENT TO COMPONENTS

function SESSION_SIGN_IN_SUCCESS(state, action) {
  console.log('inside of success');
  console.log(action);

	return {
		...state,
    isAuthenticated: action.payload.isAuthenticated,
    accessToken: action.payload.token,
    language: action.payload.language,
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


function UPDATE_PROFLE_LANG(state, action) {
  return {
    ...state,
    language: action.payload
  };
}


const handlers = {};
handlers[AuthTypes.SESSION_SIGN_IN_SUCCESS] = SESSION_SIGN_IN_SUCCESS;
handlers[AuthTypes.SESSION_SIGN_IN_FAILED] = SESSION_SIGN_IN_FAILED;
handlers[AuthTypes.UPDATE_PROFLE_LANG] = UPDATE_PROFLE_LANG;

export default createReducer(defaultState, handlers);
