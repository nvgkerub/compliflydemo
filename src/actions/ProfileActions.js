import axios from 'axios';
import * as ProfileTypes from '../constants/ProfileTypes';
import * as userAPI from '../lib/api/userAPI';

export function grabUserProfile(token) {
  // const data = `access_token=${token}`;

  return (dispatch) => {
    axios.get(userAPI.profile.userData, { params: {
        access_token: token
      }
    })
      .then((res) => (
        dispatch({
          type: ProfileTypes.GRAB_USER_PROFILE,
          userProfile: res.data
        })
      ))
      .catch((err) => console.log(err));
  };
}
