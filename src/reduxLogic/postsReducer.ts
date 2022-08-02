import { IAuthData, IPostsState } from '../interfaces';
import { getCookie } from '../cookieHelpers';
import { STORE_POSTS, CHANGE_PAGE } from './types';
const initialValue: IPostsState = {
	posts: [],
	pagination: {
		current: '1',
		pageCount: '',
		perPage: '',
		total: '',
	},
};

export const postsReducer = (state = initialValue, action: any) => {
	switch (action.type) {
		case STORE_POSTS:
			return { ...state, posts: action.payload.posts, pagination: action.payload.pagination };
		case CHANGE_PAGE:
			return { ...state, pagination: { ...state.pagination, current: action.payload.payload + '' } };
		default:
			return state;
	}
};
