import axios from 'axios';
import * as ProfileTypes from '../constants/ProfileTypes';
import * as userAPI from '../lib/api/userAPI';

export function grabUserProfile(token) {
  return (dispatch) => {
    axios.get(userAPI.profile.userData, { params: {
        access_token: token
      }
    })
      .then((res) => (
        dispatch({
          type: ProfileTypes.GRAB_USER_PROFILE,
          payload: res.data
        })
      ))
      .catch((err) => console.log(err));
  };
}

export function grabUserJobs(token) {
  return (dispatch) => {
    axios.get(userAPI.jobs.jobsData, { params: {
        access_token: token
      }
    })
      .then((res) => (
        dispatch({
          type: ProfileTypes.GRAB_USER_JOBS,
          payload: res.data
        })
      ))
      .catch((err) => console.log(err));
  };
}
