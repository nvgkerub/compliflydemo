import axios from 'axios';
import { NavigationActions } from 'react-navigation';
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

export function grabUserPic(token) {
  return (dispatch) => {
    axios.get(userAPI.profile.userProfilePic, {
      params: {
        access_token: token,
      }
    })
      .then(res => (
        res.data.status === 'success'
        ?
        dispatch({
          type: ProfileTypes.GRAB_USER_PIC,
          payload: res.data.response.photo
        })
        :
        dispatch({
          type: ProfileTypes.GRAB_USER_PIC,
          payload: null
        })
      ))
      .catch(err => console.log('errror inside of profile pic', err));
  };
}

export function uploadProfilePic(token, image) {
  const body = new FormData();
  body.append('image', {
    uri: image,
    type: 'image/jpeg',
    name: 'profilePhoto',
  });
  body.append('access_token', token);
  console.log(body);
  return (dispatch) => {
    fetch(userAPI.profile.userUploadPic, {
      method: 'POST',
      body
    })
    .then(res => dispatch(grabUserPic(token)))
    .then(() => dispatch(NavigationActions.back()))
    .catch(err => console.log(err));
  };
  // const datas = `access_token=${token}&image=${image}`;
  // return (dispatch) => {
  //   axios.post(userAPI.profile.userUploadPic, datas)
  //   .then(res => console.log(res))
  //   .then(res => (
  //     dispatch({
  //       type: ProfileTypes.UPLOAD_PROFILE_PIC,
  //       payload: image,
  //     })
  //   ))
  //   .catch(err => console.log('error uploading profile pic', err))
  // };
}
