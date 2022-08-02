import { put, select, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { COLLECT_USER_AUTH_DATA, REFRESH_TOKEN, GET_POSTS, CHANGE_PAGE, LOGOUT } from './types';
import { savePosts, getPosts } from './actions';
import { IAuthData } from '../interfaces';
import { push } from 'connected-react-router';

export function* rootSaga(): Generator {
	yield all([
		takeLatest(REFRESH_TOKEN, authWorker),
		takeEvery(GET_POSTS, postsWorker),
		takeEvery(CHANGE_PAGE, changePageWorker),
		takeEvery(LOGOUT, logoutWorker),
	]);
}

function* logoutWorker(): Generator {
	yield put(push('/login'));
}

function* authWorker(): Generator {
	try {
		const state: any = yield select();
		const payload = yield call(refreshHandle, state.auth.refreshToken);
		yield put({ type: COLLECT_USER_AUTH_DATA, payload });
		const path = yield select(({ router }) => router.location.pathname);
		if (path === '/admin') {
			yield put(getPosts());
		} else {
			yield put(push('/admin'));
		}
	} catch (error) {
		alert(error);
	}
}

async function refreshHandle(token: string) {
	const multiformData = new FormData();
	multiformData.append('refresh_token', token);
	const response = await fetch('http://rest-test.machineheads.ru/auth/token-refresh', {
		method: 'POST',
		body: multiformData,
	});
	const data = await response.json();
	const payload: IAuthData = {
		authToken: data.access_token,
		refreshToken: data.refresh_token,
		authExpires: data.access_expired_at,
		refreshExpires: data.refresh_expired_at,
	};

	return payload;
}

/**
 * Получение постов
 */

function* postsWorker(): Generator {
	const state: any = yield select();

	const payload = yield call(postsHandle, state.auth.authToken, +state.posts.pagination.current);

	yield put(savePosts(payload));
}

async function postsHandle(token: string, page: number) {
	try {
		const multiformData = new FormData();
		multiformData.append('access-token', token);

		const response = await fetch(`http://rest-test.machineheads.ru/manage/posts?page=${page}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		const paginationInfo = {
			current: response.headers.get('X-Pagination-Current-Page'),
			pageCount: response.headers.get('X-Pagination-Page-Count'),
			perPage: response.headers.get('X-Pagination-Per-Page'),
			total: response.headers.get('X-Pagination-Total-Count'),
		};
		const posts = await response.json();

		return { posts, paginationInfo };
	} catch (error) {
		console.error(error);
	}
}

function* changePageWorker(): Generator {
	yield put(getPosts());
}
