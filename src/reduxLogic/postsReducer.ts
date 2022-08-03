import { IPostsState } from '../interfaces';
import { STORE_POSTS, CHANGE_PAGE, STORE_AUTHORS, STORE_TAGS, POST_ERROR } from './types';
const initialValue: IPostsState = {
	posts: [],
	pagination: {
		current: '1',
		pageCount: '',
		perPage: '',
		total: '',
	},
	authors: [],
	tags: [],
	errorList: [],
};

export const postsReducer = (state = initialValue, action: any) => {
	switch (action.type) {
		case STORE_POSTS:
			return { ...state, posts: action.payload.posts, pagination: action.payload.pagination };
		case CHANGE_PAGE:
			return { ...state, pagination: { ...state.pagination, current: action.payload.payload + '' } };
		case STORE_AUTHORS:
			return {
				...state,
				authors: [...action.payload],
			};
		case STORE_TAGS:
			return {
				...state,
				tags: [...action.payload],
			};
		case POST_ERROR: {
			return {
				...state,
				errorList: [...action.payload],
			};
		}
		default:
			return state;
	}
};
