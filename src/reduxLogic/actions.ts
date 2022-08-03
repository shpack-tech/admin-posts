import { IAuthData, IAuthor, IAuthTokens, IPostTemplate, ITag } from '../interfaces';
import {
	COLLECT_USER_AUTH_DATA,
	REFRESH_TOKEN,
	GET_POSTS,
	STORE_POSTS,
	CHANGE_PAGE,
	LOGOUT,
	GET_AUTHORS,
	STORE_AUTHORS,
	GET_TAGS,
	STORE_TAGS,
	NEW_POST,
	POST_ERROR,
} from './types';

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

export function newPost(payload: IPostTemplate) {
	return {
		type: NEW_POST,
		payload: { ...payload },
	};
}

export function pushError(payload: string[]) {
	return {
		type: POST_ERROR,
		payload: [...payload],
	};
}

export function getAuthors() {
	return {
		type: GET_AUTHORS,
	};
}

export function getTags() {
	return {
		type: GET_TAGS,
	};
}

export function storeAuthors(payload: IAuthor[] | any) {
	return {
		type: STORE_AUTHORS,
		payload: [...payload],
	};
}

export function storeTags(payload: ITag[] | any) {
	return {
		type: STORE_TAGS,
		payload: [...payload],
	};
}

export function logout(payload: IAuthTokens) {
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
