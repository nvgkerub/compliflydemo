import * as ProfileTypes from '../constants/ProfileTypes';
import createReducer from '../lib/createReducer';

const defaultState = {
  isAuthenticated: null,
  error: null,
  accessToken: null,
};

function GRAB_USER_PROFILE(state, action) {

}

const handlers = {};
handlers[ProfileTypes.GRAB_USER_PROFILE] = GRAB_USER_PROFILE;

export default createReducer(defaultState, handlers);
