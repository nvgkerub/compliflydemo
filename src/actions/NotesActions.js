//TODO AUTH ACTIONS BACK UP. REMOVE this


import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import * as AuthTypes from '../constants/AuthTypes';

export function signIn() {
	try {
		AsyncStorage.getItem('user')
			.then(() => {
				return {
					type: AuthTypes.SESSION_SIGN_IN_SUCCESS,
					isAuthenticated: true,
				};
			})
			.catch((err) => {
				return {
					type: AuthTypes.SESSION_SIGN_IN_FAILED,
					error: 'Access Denied',
				};
			});
	} catch (err) {
		console.log(err);
	}
}

export function makeSignInRequest() {
	const userObject = {
		isAuthenticated: true,
	};
	//TODO: Make logic from API if login is confirmed
	try {
		AsyncStorage.setItem('user', JSON.stringify(userObject))
			.then(() => {
				return dispatch => {
					dispatch(signIn());
				};
			});
	} catch (error) {
		return {
			type: AuthTypes.SESSION_SIGN_IN_FAILED,
			error: 'Access Denied',
		};
	}
}
