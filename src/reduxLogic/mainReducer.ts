import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { postsReducer } from './postsReducer';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

export const mainReducer = combineReducers({
	auth: authReducer,
	posts: postsReducer,
	router: connectRouter(history),
});

export type RootState = ReturnType<typeof mainReducer>;
