import React, { lazy, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { refreshUserToken } from './reduxLogic/actions';
import Header from './components/globalComponents/header/Header';
import { RootState } from './reduxLogic/mainReducer';
import { push } from 'connected-react-router';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const App: React.FC = () => {
	const { authToken, refreshToken } = useSelector((store: RootState) => store?.auth || false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!authToken && refreshToken) {
			dispatch(refreshUserToken());
		}
	}, []);

	return (
		<>
			<Header />
			<Switch>
				<Route path="/" exact>
					{!authToken ? <Redirect to={'/login'} /> : <Redirect to={'/admin'} />}
				</Route>
				<Route path="/login" exact>
					{!authToken ? <LoginPage /> : <Redirect to={'/admin'} />}
				</Route>
				<Route path="/admin" exact>
					{authToken ? <AdminPage /> : <Redirect to={'/login'} />}
				</Route>
			</Switch>
		</>
	);
};

export default App;
