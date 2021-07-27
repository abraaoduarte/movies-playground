import * as S from './styles'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useRouter } from 'next/router'
import { Input, Button } from 'components'
import { useForm, Controller } from "react-hook-form";

type FormValues = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
    const { watch,
		control,
		handleSubmit,
		formState: { errors, isSubmitted },
    } = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});
    const values = watch();
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (form: FormValues) => {
        try {
            setLoading(true)

            const { data } = await axios.post('http://localhost:3001/api/v1/auth/login', {
                email: form.email,
                password: form.password,
            })

            localStorage.setItem('user', JSON.stringify(data.result.user));
            localStorage.setItem('token', data.result.token);
            router.push('/movies')

        } catch (error) {
            setLoading(false)
        }
    }

    if (loading) {
        return <CircularProgress />
    }
    return (
        <S.Container>
            <S.FormContainer>
                <h3>Welcome!</h3>
                <h4>Movies repository</h4>
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
        </S.Container>
    )
}

export default Login;