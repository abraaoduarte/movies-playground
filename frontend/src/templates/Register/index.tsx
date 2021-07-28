import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Loading } from 'components';
import { useForm, Controller } from 'react-hook-form';
import client from '../../services/client-axios';
import * as S from './styles';
import BaseTemplate from '../Base';

type FormValues = {
	email: string;
	password: string;
	name: string;
};

const Register: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	});
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (form: FormValues) => {
		try {
			setLoading(true);

			await client.post('/users/register', {
				email: form.email,
				password: form.password,
				name: form.name,
			});

			setTimeout(() => {
				setLoading(false);
				router.push('/login');
			}, 1000);
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
		<BaseTemplate title="Register">
			<S.FormContainer>
				<h3>Register!</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name="name"
						rules={{
							required: {
								value: true,
								message: 'Name is required.',
							},
						}}
						render={({ field }) => (
							<Input
								{...field}
								label="Name"
								autoComplete="off"
								type="text"
								error={errors?.name?.message}
								hasError={!!errors?.name?.message}
							/>
						)}
					/>

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
								maxLength={300}
								type="password"
								error={errors?.password?.message}
								hasError={!!errors?.password?.message}
							/>
						)}
					/>
					<Button type="submit" text="Register" />
				</form>
			</S.FormContainer>
		</BaseTemplate>
	);
};

export default Register;
