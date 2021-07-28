import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Loading } from 'components';
import { useForm, Controller } from 'react-hook-form';
import * as S from './styles';
import BaseTemplate from '../Base';
import client from '../../services/client-axios';

type FormValues = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
	const router = useRouter();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [loading, setLoading] = useState(false);

	const onSubmit = async (form: FormValues) => {
		try {
			setLoading(true);

			const { data } = await client.post('/auth/login', {
				email: form.email,
				password: form.password,
			});

			setTimeout(() => {
				setLoading(false);
				localStorage.setItem('user', JSON.stringify(data.result.user));
				localStorage.setItem('token', data.result.token);
				router.push('/');
			}, 700);
		} catch (error) {
			setTimeout(() => setLoading(false), 1000);
		}
	};

	if (loading) {
		return (
			<BaseTemplate title="Login">
				<Loading />
			</BaseTemplate>
		);
	}

	return (
		<BaseTemplate title="Login">
			<S.FormContainer>
				<h3>Login!</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name="email"
						rules={{
							required: {
								value: true,
								message: 'E-mail is required.',
							},
						}}
						render={({ field }) => (
							<Input
								{...field}
								label="E-mail"
								autoComplete="off"
								maxLength={300}
								type="text"
								error={errors?.email?.message}
								hasError={!!errors?.email?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						rules={{
							required: {
								value: true,
								message: 'Password is required.',
							},
						}}
						render={({ field }) => (
							<Input
								{...field}
								label="Password"
								autoComplete="off"
								type="password"
								error={errors?.password?.message}
								hasError={!!errors?.password?.message}
							/>
						)}
					/>
					<Button type="submit" text="Login" />
					<Link href="/register">
						<a>Register</a>
					</Link>
				</form>
			</S.FormContainer>
		</BaseTemplate>
	);
};

export default Login;
