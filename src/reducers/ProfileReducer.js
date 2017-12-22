import * as ProfileTypes from '../constants/ProfileTypes';
import createReducer from '../lib/createReducer';

const defaultState = {
  isAuthenticated: null,
  error: null,
  userProfile: null,
};

function GRAB_USER_PROFILE(state, action) {
  console.log('inside of reducer', action);
  return {
    ...state,
    userProfile: action.userProfile
  };
}

const handlers = {};
handlers[ProfileTypes.GRAB_USER_PROFILE] = GRAB_USER_PROFILE;

export default createReducer(defaultState, handlers);
