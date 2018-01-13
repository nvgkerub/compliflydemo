import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import * as AuthTypes from '../constants/AuthTypes';
import * as routeNames from '../constants/routeNames';
import * as userAPI from '../lib/api/userAPI';

function signInSuccess(token, username, password) {
	AsyncStorage.setItem('username', username);
	AsyncStorage.setItem('password', password);
	return (dispatch) => {
		dispatch({
			type: AuthTypes.SESSION_SIGN_IN_SUCCESS,
			payload: {
				token,
				isAuthenticated: true,
			}
		});
		// dispatch(grabUserPic(token));
		dispatch(NavigationActions.navigate({ routeName: routeNames.root.drawer }));
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
	const datas = `username=${user}&password=${pass}`;
	return (dispatch) => {
		axios.post(userAPI.auth.login, datas)
		.then((res) => (
			res.data.status === 'success'
				?
			dispatch(signInSuccess(res.data.access_token, user, pass))
				:
			dispatch(signInFailed(res.data.response))
		))
		.catch((err) => {
			console.log(err);
		});
	};
}
