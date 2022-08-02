import { mainReducer } from './mainReducer';
import { rootSaga } from './sagas';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { history } from './mainReducer';
const saga = createSagaMiddleware();

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(mainReducer, composeEnhancers(applyMiddleware(routerMiddleware(history), saga))); //Устаревший подход, но не стал подключать toolkit, так как в задании сказано просто про redux
saga.run(rootSaga);
