import { put, select, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { COLLECT_USER_AUTH_DATA, REFRESH_TOKEN, GET_POSTS, CHANGE_PAGE, LOGOUT, GET_AUTHORS, GET_TAGS, NEW_POST } from './types';
import { savePosts, getPosts, storeAuthors, storeTags, pushError } from './actions';
import { IAuthData, IPostTemplate, I422AuthErrorItem } from '../interfaces';
import { push } from 'connected-react-router';

export function* rootSaga(): Generator {
	yield all([
		takeLatest(REFRESH_TOKEN, authWorker),
		takeLatest(GET_POSTS, postsWorker),
		takeLatest(CHANGE_PAGE, changePageWorker),
		takeLatest(GET_AUTHORS, getAuthorsWorker),
		takeLatest(GET_TAGS, getTagsWorker),
		takeLatest(NEW_POST, newPostWorker),
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

function* getAuthorsWorker(): Generator {
	const state: any = yield select();
	const payload = yield call(handlePostData, state.auth.authToken, 'http://rest-test.machineheads.ru/manage/authors');
	yield put(storeAuthors(payload));
}

function* getTagsWorker(): Generator {
	const state: any = yield select();
	const payload = yield call(handlePostData, state.auth.authToken, 'http://rest-test.machineheads.ru/manage/tags');
	yield put(storeTags(payload));
}

async function handlePostData(token: string, endpoint: string) {
	//  можно было адаптировать postsHandle для гет запросов и передавать туда эндпоинт и токен,
	// 	но пэйлоады возвращаются разные и в postsHandle есть еще дополнительно логика, кроме как просто вернуть что пришло с сервера
	try {
		const multiformData = new FormData();
		// multiformData.append('access-token', token);
		const response = await fetch(endpoint, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		const info = await response.json();
		return info;
	} catch (error) {
		console.error(error);
	}
}

function* newPostWorker(data: any): Generator {
	const state: any = yield select();
	const payload = yield call(handleNewPost, state.auth.authToken, data.payload);

	if (payload === 'ok') {
		yield put(getPosts());
		yield put(pushError([]));
	} else if (Array.isArray(payload)) {
		yield put(pushError(payload));
	}
}

async function handleNewPost(token: string, info: IPostTemplate) {
	try {
		const multiformData = new FormData();
		multiformData.append('code', info.code);
		multiformData.append('title', info.title);
		multiformData.append('authorId', info.authorId);
		if (info.tagIds.length > 0) {
			for (let i = 0; i < info.tagIds.length; i++) {
				multiformData.append('tagIds[]', info.tagIds[i]);
			}
		}
		multiformData.append('text', info.text);
		multiformData.append('previewPicture', info.previewPicture);
		const response = await fetch('http://rest-test.machineheads.ru/manage/posts/add', {
			method: 'POST',
			body: multiformData,
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		const data = await response.json();

		switch (response.status) {
			case 200:
				return 'ok';

			case 400:
				return [data.message];

			case 422:
				const errorHelpArr: string[] = [];
				data.forEach((el: I422AuthErrorItem) => {
					errorHelpArr.push(el.message);
				});
				return errorHelpArr;

			default:
				return ['Произошла ошибка, попробуйте снова'];
		}
	} catch (error) {
		console.error(error);
	}
}
