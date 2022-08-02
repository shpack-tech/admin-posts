import { IAuthData } from '../interfaces';
import { getCookie } from '../cookieHelpers';
import { COLLECT_USER_AUTH_DATA, LOGOUT } from './types';
import { secondsToDate } from '../cookieHelpers';
import { deleteAuthCookies } from '../cookieHelpers';
const initialValue: IAuthData = {
	authToken: getCookie('token') || '',
	refreshToken: getCookie('refresh_token') || '',
	authExpires: 0,
	refreshExpires: 0,
};

export const authReducer = (state = initialValue, action: any) => {
	switch (action.type) {
		case COLLECT_USER_AUTH_DATA:
			document.cookie = `token=${action.payload.authToken};expires=${secondsToDate(action.payload.authExpires)};`;
			document.cookie = `refresh_token=${action.payload.refreshToken}; expires=${secondsToDate(action.payload.refreshExpires)};`;
			const nt = [...action.payload.authToken].join('');
			const rt = [...action.payload.refreshToken].join('');
			return { ...state, authToken: nt, refreshToken: rt };
		case LOGOUT:
			deleteAuthCookies();
			const nnt = [...action.payload.authToken].join('');
			const rrt = [...action.payload.refreshToken].join('');
			return { ...state, authToken: nnt, refreshToken: rrt };
		default:
			return state;
	}
};
