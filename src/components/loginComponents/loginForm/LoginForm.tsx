import React, { useState, useEffect } from 'react';
import { Input, Space, Button, message, Alert } from 'antd';
import { collectUserAuthData } from '../../../reduxLogic/actions';
import { useDispatch } from 'react-redux';
import { ILoginData, I422AuthErrorItem } from '../../../interfaces';
import { push } from 'connected-react-router';

import './login-form.scss';

const LoginForm: React.FC = () => {
	const [loginVal, setLoginVal] = useState<string>(''); // Тут используется не useRef чтобы компонет был управляемый
	const [passwordVal, setPasswordVal] = useState<string>('');
	const [errorList, setErrorList] = useState<string[]>([]);
	const dispatch = useDispatch();

	const loginHandle = async ({ login, password }: ILoginData) => {
		try {
			const multiformData = new FormData();
			multiformData.append('email', login);
			multiformData.append('password', password);
			const response = await fetch('http://rest-test.machineheads.ru/auth/token-generate', {
				method: 'POST',
				body: multiformData,
			});
			const data = await response.json();

			switch (response.status) {
				case 200:
					dispatch(
						collectUserAuthData({
							authToken: data.access_token,
							refreshToken: data.refresh_token,
							authExpires: data.access_expired_at,
							refreshExpires: data.refresh_expired_at,
						})
					);
					dispatch(push('/admin'));

					break;
				case 400:
					setErrorList([data.message]);
					break;

				case 422:
					const errorHelpArr: string[] = [];
					data.forEach((el: I422AuthErrorItem) => {
						errorHelpArr.push(el.message);
					});
					setErrorList(errorHelpArr);
					break;
				default:
					setErrorList(['Произошла ошибка, попробуйте снова']);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form
			className="login-from"
			onSubmit={(e): void => {
				e.preventDefault();
				loginHandle({ login: loginVal, password: passwordVal });
			}}
		>
			<h1>ВХОД</h1>
			<Space direction="vertical">
				<Input
					placeholder="Логин"
					value={loginVal}
					required={true}
					onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setLoginVal(e.target.value);
					}}
				/>
				<Input.Password
					placeholder="Введите пароль"
					value={passwordVal}
					required={true}
					autoComplete="autocomplete"
					onInput={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setPasswordVal(e.target.value);
					}}
				/>
				{errorList.length > 0
					? errorList.map((el, i) => {
							return <Alert key={i} type="warning" message={el} />;
					  })
					: ''}
				<Button htmlType="submit">Войти</Button>
			</Space>
		</form>
	);
};

export default LoginForm;
