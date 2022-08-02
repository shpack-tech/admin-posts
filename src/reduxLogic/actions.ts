import { IAuthData } from '../interfaces';
import { COLLECT_USER_AUTH_DATA, REFRESH_TOKEN, GET_POSTS, STORE_POSTS, CHANGE_PAGE, LOGOUT } from './types';

export function collectUserAuthData(authData: IAuthData) {
	if (authData) {
		return {
			type: COLLECT_USER_AUTH_DATA,
			payload: {
				authToken: authData.authToken,
				refreshToken: authData.refreshToken,
			},
		};
	}
}

export function logout(payload: any) {
	return {
		type: LOGOUT,
		payload: {
			authToken: payload.authToken,
			refreshToken: payload.refreshToken,
		},
	};
}

export function savePosts(payload: any) {
	return {
		type: STORE_POSTS,
		payload: {
			posts: [...payload.posts],
			pagination: { ...payload.paginationInfo },
		},
	};
}
export function changePage(payload: any) {
	return {
		type: CHANGE_PAGE,
		payload: {
			payload,
		},
	};
}
export function getPosts() {
	return {
		type: GET_POSTS,
	};
}

export function refreshUserToken() {
	return {
		type: REFRESH_TOKEN,
	};
}
