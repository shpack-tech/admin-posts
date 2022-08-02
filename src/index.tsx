import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './reduxLogic/store';
import { history } from './reduxLogic/mainReducer';

import 'antd/dist/antd.min.css';
import './index.scss';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Suspense fallback={<h1>Загрузка...</h1>}>
				<ConnectedRouter history={history}>
					<App />
				</ConnectedRouter>
			</Suspense>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
