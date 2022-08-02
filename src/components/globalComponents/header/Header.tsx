import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../reduxLogic/actions';
import { push } from 'connected-react-router';
import { RootState } from '../../../reduxLogic/mainReducer';
import './header.scss';

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const { authToken } = useSelector((store: RootState) => store?.auth || false);

	return (
		<div className="header">
			<div className="user-status">{authToken ? 'Админ-панель' : 'Логин'}</div>
			{authToken ? (
				<Button
					onClick={() => {
						dispatch(logout({ authToken: '', refreshToken: '' }));
						dispatch(push('/login'));
					}}
				>
					Выйти <LogoutOutlined />
				</Button>
			) : (
				''
			)}
		</div>
	);
};

export default Header;
