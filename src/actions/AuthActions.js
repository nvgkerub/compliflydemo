import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import * as AuthTypes from '../constants/AuthTypes';
import * as userAPI from '../lib/api/userAPI';

function signInSuccess(token) {
	return (dispatch) => {
		dispatch({
			type: AuthTypes.SESSION_SIGN_IN_SUCCESS,
			payload: {
				token,
				isAuthenticated: true,
			}
		});
	};
}

function signInFailed(response) {
	return (dispatch) => {
		dispatch({
			type: AuthTypes.SESSION_SIGN_IN_FAILED,
			payload: {
				response,
				isAuthenticated: false,
			}
		});
	};
}

export function makeSignInRequest(user, pass) {
	//TODO: Make logic from API if login is confirmed
	//TODO: send DATA response object to REDUCER to be saved in APP state

	console.log(user, pass);

	const datas = `username=${user}&password=${pass}`;

	return (dispatch) => {
		axios.post(userAPI.auth.login, datas)
		.then((res) => (
			res.data.status === 'success'
				?
			dispatch(signInSuccess(res.data.access_token))
				:
			dispatch(signInFailed(res.data.response))
		)).catch((err) => {
			console.log(err);
		});
	};
}
