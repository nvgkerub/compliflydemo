import * as ProfileTypes from '../constants/ProfileTypes';
import createReducer from '../lib/createReducer';

const defaultState = {
  isAuthenticated: null,
  error: null,
  userProfile: null,
  userJobs: null,
};

function GRAB_USER_PROFILE(state, action) {
  return {
    ...state,
    userProfile: action.payload
  };
}

function GRAB_USER_JOBS(state, action) {
  return {
    ...state,
    userJobs: action.payload
  };
}

const handlers = {};
handlers[ProfileTypes.GRAB_USER_PROFILE] = GRAB_USER_PROFILE;
handlers[ProfileTypes.GRAB_USER_JOBS] = GRAB_USER_JOBS;

export default createReducer(defaultState, handlers);
