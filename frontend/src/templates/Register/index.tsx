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
	name: string;
};

const Register: React.FC = () => {
    const { watch,
		control,
		handleSubmit,
		formState: { errors, isSubmitted },
    } = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
            name: '',
		},
	});
    const values = watch();
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const onSubmit = async (form: FormValues) => {
        try {
            setLoading(true)

            const { data } = await axios.post('http://localhost:3001/api/v1/users/register', {
                email: form.email,
                password: form.password,
                name: form.name,
            })

            router.push('/login')

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
        </S.Container>
    )
}

export default Register;